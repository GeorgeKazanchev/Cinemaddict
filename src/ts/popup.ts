import { CommentDeleteHandler, FilmControlsHandler } from './model/types/handlers';
import PopupView from './view/popup/popup-view';
import type Comment from './model/types/comment';
import type Film from './model/types/film';

type Props = {
  comments: Comment[];
  film: Film;
  onCommentDelete: CommentDeleteHandler;
  onFavoriteChange: FilmControlsHandler;
  onWatchedChange: FilmControlsHandler;
  onWatchlistChange: FilmControlsHandler;
};

export default class Popup {
  constructor({
    comments,
    film,
    onWatchlistChange,
    onWatchedChange,
    onFavoriteChange,
    onCommentDelete,
  }: Props) {
    this._comments = comments;
    this._film = film;

    //  Выполняется логика, пришедшая снаружи, а также собственная логика
    const handleCommentDelete = (comment: Comment) => {
      onCommentDelete(comment);
      this._onCommentDelete(comment);
    };

    this._popupView = new PopupView({
      comments: this._comments,
      film: this._film,
      onClose: this._onClose.bind(this),
      onWatchlistChange,
      onWatchedChange,
      onFavoriteChange,
      onCommentDelete: handleCommentDelete,
    });

    this._popupView.onClose = this._onClose.bind(this);
  }

  private _comments: Comment[];
  private _film: Film;
  private _popupView: PopupView;

  public get element(): Element {
    return this._popupView.element;
  }

  private _onClose(): void {
    this.element.remove();
  }

  private _onCommentDelete(comment: Comment): void {
    const commentIndex = this._comments.findIndex((item) => item.id === comment.id);
    this._comments.splice(commentIndex, 1);

    this._popupView.deleteCommentCard(comment.id);
    this._popupView.updateCommentsCount();
  }
}
