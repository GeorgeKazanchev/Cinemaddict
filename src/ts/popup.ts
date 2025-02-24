import PopupView from './view/popup/popup-view';
import type Comment from './model/types/comment';
import type Film from './model/types/film';

type FilmControlsHandler = (film: Film) => void;

type Props = {
  comments: Comment[];
  film: Film;
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
  }: Props) {
    this._comments = comments;
    this._film = film;

    this._popupView = new PopupView({ comments: this._comments, film: this._film });

    this._popupView.onClose = this._onClose.bind(this);
    this._popupView.onWatchlistChange = onWatchlistChange;
    this._popupView.onWatchedChange = onWatchedChange;
    this._popupView.onFavoriteChange = onFavoriteChange;
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
}
