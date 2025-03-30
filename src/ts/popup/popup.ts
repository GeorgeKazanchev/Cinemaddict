import he from 'he';
import Api from '../api/api';
import { Comment, Film, Handlers } from '../model';
import Model from '../model/model';
import PopupView from './popup-view';

type Props = {
  filmId: string;
  model: Model;
  onCommentsCountChange: Handlers.NoParamHandler;
  onFavoriteChange: Handlers.FilmControlAsyncHandler;
  onWatchedChange: Handlers.FilmControlAsyncHandler;
  onWatchlistChange: Handlers.FilmControlAsyncHandler;
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
    this._onWatchlistChangeFilmsScreen = onWatchlistChange;
    this._onWatchedChangeFilmsScreen = onWatchedChange;
    this._onFavoriteChangeFilmsScreen = onFavoriteChange;

    this._loadCommentsFromServer();

    this._popupView = new PopupView({
      model,
      filmId,
      onClose: this._onClose.bind(this),
      onWatchlistChange: this._onWatchlistChange.bind(this),
      onWatchedChange: this._onWatchedChange.bind(this),
      onFavoriteChange: this._onFavoriteChange.bind(this),
      onCommentDelete: this._onCommentDelete.bind(this),
    });

    this._popupView.onClose = this._onClose.bind(this);
    this._popupView.onCommentSubmit = this._onCommentSubmit.bind(this);
  }

  private _model: Model;
  private _filmId: string;
  private _popupView: PopupView;
  private _onCommentsCountChange: Handlers.NoParamHandler;
  private _onWatchlistChangeFilmsScreen: Handlers.FilmControlAsyncHandler;
  private _onWatchedChangeFilmsScreen: Handlers.FilmControlAsyncHandler;
  private _onFavoriteChangeFilmsScreen: Handlers.FilmControlAsyncHandler;

  public get element(): Element {
    return this._popupView.element;
  }

  private _loadCommentsFromServer(): void {
    this._loadComments().catch(() => Promise.resolve());
  }

  private async _loadComments(): Promise<void> {
    const areCommentsLoaded = this._model.commentsLoadingStates.get(this._filmId) === 'success';
    if (areCommentsLoaded) {
      return;
    }

    try {
      const comments = await Api.loadComments(this._filmId);
      const film = this._model.getFilmById(this._filmId);
      this._model.updateCommentsForFilm(film, comments);
      this._model.commentsLoadingStates.set(this._filmId, 'success');
      this._popupView.updateShownComments();
    } catch {
      this._model.commentsLoadingStates.set(this._filmId, 'error');
      this._popupView.updateShownComments();
    }
  }

  private _onClose(): void {
    this.element.remove();
  }

  private _onWatchlistChange(film: Film): void {
    this._changeWatchlist(film).catch(() => Promise.resolve());
  }

  private _onWatchedChange(film: Film): void {
    this._changeWatched(film).catch(() => Promise.resolve());
  }

  private _onFavoriteChange(film: Film): void {
    this._changeFavorite(film).catch(() => Promise.resolve());
  }

  private async _changeWatchlist(film: Film): Promise<void> {
    this._popupView.makeControlsEnabled(false);
    await this._onWatchlistChangeFilmsScreen(film);
    this._popupView.makeControlsEnabled(true);
    this._popupView.updateWatchlistButton();
  }

  private async _changeWatched(film: Film): Promise<void> {
    this._popupView.makeControlsEnabled(false);
    await this._onWatchedChangeFilmsScreen(film);
    this._popupView.makeControlsEnabled(true);
    this._popupView.updateWatchedButton();
  }

  private async _changeFavorite(film: Film): Promise<void> {
    this._popupView.makeControlsEnabled(false);
    await this._onFavoriteChangeFilmsScreen(film);
    this._popupView.makeControlsEnabled(true);
    this._popupView.updateFavoriteButton();
  }

  private _onCommentDelete(comment: Comment): void {
    this._deleteComment(comment).catch(() => Promise.resolve());
  }

  private _onCommentSubmit(): void {
    this._submitComment().catch(() => Promise.resolve());
  }

  private async _deleteComment(comment: Comment): Promise<void> {
    this._popupView.makeDeleteButtonEnabled(comment.id, false);
    try {
      await Api.deleteComment(comment.id);
      this._model.deleteComment(comment, this._filmId);
      this._popupView.updateShownComments();
      this._popupView.updateCommentsCount();
      this._onCommentsCountChange();
    } catch {
      this._popupView.makeDeleteButtonEnabled(comment.id, true);
    }
  }

  private async _submitComment(): Promise<void> {
    this._popupView.makeCommentFormEnabled(false);

    const comment = {
      date: new Date(),
      emotion: this._popupView.getNewCommentEmotion(),
      text: he.encode(this._popupView.getNewCommentText()),
    };

    try {
      const [film, comments] = await Api.createComment(comment, this._filmId);
      this._model.updateCommentsForFilm(film, comments);
      this._popupView.updateShownComments();
      this._popupView.updateCommentsCount();
      this._popupView.resetNewCommentText();
      this._popupView.resetNewCommentEmotion();
      this._onCommentsCountChange();
    } catch {
      this._popupView.shakeCommentForm();
    } finally {
      this._popupView.makeCommentFormEnabled(true);
    }
  }
}
