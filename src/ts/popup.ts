import PopupView from './view/popup/popup-view';
import type Comment from './model/types/comment';
import type Film from './model/types/film';

type Props = {
  comments: Comment[];
  film: Film;
};

export default class Popup {
  constructor({ comments, film }: Props) {
    this._comments = comments;
    this._film = film;

    this._popupView = new PopupView({ comments: this._comments, film: this._film });

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
}
