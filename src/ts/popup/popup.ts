import he from 'he';
import Api from '../api/api';
import { Comment, Handlers } from '../model';
import Model from '../model/model';
import PopupView from './popup-view';

type Props = {
  filmId: string;
  model: Model;
  onCommentsCountChange: Handlers.NoParamHandler;
  onFavoriteChange: Handlers.FilmControlsHandler;
  onWatchedChange: Handlers.FilmControlsHandler;
  onWatchlistChange: Handlers.FilmControlsHandler;
};

export default class Popup {
  constructor({
    model,
    filmId,
    onWatchlistChange,
    onWatchedChange,
    onFavoriteChange,
    onCommentsCountChange,
  }: Props) {
    this._model = model;
    this._filmId = filmId;
    this._onCommentsCountChange = onCommentsCountChange;

    this._loadComments();

    this._popupView = new PopupView({
      model,
      filmId,
      onClose: this._onClose.bind(this),
      onWatchlistChange,
      onWatchedChange,
      onFavoriteChange,
      onCommentDelete: this._onCommentDelete.bind(this),
    });

    this._popupView.onClose = this._onClose.bind(this);
    this._popupView.onCommentSubmit = this._onCommentSubmit.bind(this);
  }

  private _model: Model;
  private _filmId: string;
  private _popupView: PopupView;
  private _onCommentsCountChange: Handlers.NoParamHandler;

  public get element(): Element {
    return this._popupView.element;
  }

  private _loadComments(): void {
    const areCommentsLoaded = this._model.commentsLoadingStates.get(this._filmId) === 'success';
    if (areCommentsLoaded) {
      return;
    }

    Api.loadComments(this._filmId)
      .then((comments) => {
        this._model.addComments(comments);
        this._model.commentsLoadingStates.set(this._filmId, 'success');
        this._popupView.updateShownComments();
      })
      .catch(() => {
        this._model.commentsLoadingStates.set(this._filmId, 'error');
        this._popupView.updateShownComments();
      });
  }

  private _onClose(): void {
    this.element.remove();
  }

  private _onCommentDelete(comment: Comment): void {
    this._popupView.makeDeleteButtonEnabled(comment.id, false);
    Api.deleteComment(comment.id)
      .then(() => {
        this._model.deleteComment(comment, this._filmId);
        this._popupView.updateShownComments();
        this._popupView.updateCommentsCount();
        this._onCommentsCountChange();
      })
      .catch(() => {
        this._popupView.makeDeleteButtonEnabled(comment.id, true);
      });
  }

  private _onCommentSubmit(): void {
    this._popupView.makeCommentFormEnabled(false);

    const comment = {
      date: new Date(),
      emotion: this._popupView.getNewCommentEmotion(),
      text: he.encode(this._popupView.getNewCommentText()),
    };

    Api.createComment(comment, this._filmId)
      .then(([film, comments]) => {
        this._model.updateCommentsForFilm(film, comments);
      })
      .then(() => {
        this._popupView.updateShownComments();
        this._popupView.updateCommentsCount();
        this._popupView.resetNewCommentText();
        this._popupView.resetNewCommentEmotion();
        this._onCommentsCountChange();
      })
      .catch(() => {
        this._popupView.shakeCommentForm();
      })
      .then(() => {
        this._popupView.makeCommentFormEnabled(true);
      })
      // Нужно, чтобы избавиться от ошибки линтера @typescript-eslint/no-floating-promises
      .catch(() => Promise.resolve());
  }
}
