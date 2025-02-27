import { Comment, Handlers } from '../model';
import Model from '../model/model';
import PopupView from './popup-view';

type Props = {
  filmId: string;
  model: Model;
  onCommentDelete: Handlers.CommentDeleteHandler;
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
    onCommentDelete,
  }: Props) {
    //  Выполняется логика, пришедшая снаружи, а также собственная логика
    const handleCommentDelete = (comment: Comment) => {
      onCommentDelete(comment);
      this._onCommentDelete(comment);
    };

    this._popupView = new PopupView({
      model,
      filmId,
      onClose: this._onClose.bind(this),
      onWatchlistChange,
      onWatchedChange,
      onFavoriteChange,
      onCommentDelete: handleCommentDelete,
    });

    this._popupView.onClose = this._onClose.bind(this);
    this._popupView.onCommentSubmit = this._onCommentSubmit.bind(this);
  }

  private _popupView: PopupView;

  public get element(): Element {
    return this._popupView.element;
  }

  private _onClose(): void {
    this.element.remove();
  }

  private _onCommentDelete(comment: Comment): void {
    this._popupView.deleteCommentCard(comment.id);
    this._popupView.updateCommentsCount();
  }

  private _onCommentSubmit(): void {
    this._popupView.resetNewCommentText();
    this._popupView.resetSelectedEmotion();
  }
}
