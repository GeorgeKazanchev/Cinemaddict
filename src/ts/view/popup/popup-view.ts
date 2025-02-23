import AbstractView from '../abstract-view';
import CloseButtonView from './close-button-view';
import CommentsView from './comments-view';
import ControlsView from './controls-view';
import InfoView from './info-view';
import type Comment from '../../model/types/comment';
import type Film from '../../model/types/film';

type Props = {
  comments: Comment[];
  film: Film;
};

export default class PopupView extends AbstractView {
  constructor({ comments, film }: Props) {
    super();
    this._comments = comments;
    this._film = film;

    this._closeButtonView = new CloseButtonView();
    this._infoView = new InfoView({ filmInfo: this._film.info });
    this._controlsView = new ControlsView({ userDetails: this._film.userDetails });
    this._commentsView = new CommentsView({ comments: this._comments });
  }

  private _comments: Comment[];
  private _film: Film;
  private _closeButtonView: CloseButtonView;
  private _infoView: InfoView;
  private _controlsView: ControlsView;
  private _commentsView: CommentsView;

  public get template(): string {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="#" method="get">
          <div class="film-details__top-container"></div>
          <div class="film-details__bottom-container"></div>
        </form>
      </section>`;
  }

  public get element(): Element {
    const element = super.element;

    const topContainerElement = element.querySelector('.film-details__top-container');
    if (topContainerElement) {
      topContainerElement.append(this._closeButtonView.element);
      topContainerElement.append(this._infoView.element);
      topContainerElement.append(this._controlsView.element);
    }

    const bottomContainerElement = element.querySelector('.film-details__bottom-container');
    if (bottomContainerElement) {
      bottomContainerElement.append(this._commentsView.element);
    }

    return element;
  }

  public bind(): void {
    /* eslint-disable no-param-reassign */
    this._closeButtonView.onClose = this.onClose.bind(this);

    this.element.addEventListener('keydown', ((evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.onClose();
      }
    }) as EventListener);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onClose(): void { }
}
