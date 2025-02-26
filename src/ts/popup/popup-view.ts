import AbstractView from '../abstract-view';
import { Comment, Film, Handlers } from '../model';
import CloseButtonView from './close-button-view';
import CommentsView from './comments-view';
import ControlsView from './controls-view';
import InfoView from './info-view';

type Props = {
  comments: Comment[];
  film: Film;
  onClose: Handlers.NoParamHandler;
  onCommentDelete: Handlers.CommentDeleteHandler;
  onFavoriteChange: Handlers.FilmControlsHandler;
  onWatchedChange: Handlers.FilmControlsHandler;
  onWatchlistChange: Handlers.FilmControlsHandler;
};

export default class PopupView extends AbstractView {
  constructor({
    comments,
    film,
    onClose,
    onWatchlistChange,
    onWatchedChange,
    onFavoriteChange,
    onCommentDelete,
  }: Props) {
    super();
    this._comments = comments;
    this._film = film;

    this._closeButtonView = new CloseButtonView();
    this._infoView = new InfoView({ filmInfo: this._film.info });
    this._controlsView = new ControlsView({ film: this._film });
    this._commentsView = new CommentsView({ comments: this._comments, onCommentDelete });

    this.onClose = onClose;

    this._closeButtonView.onClose = onClose;
    this._controlsView.onWatchlistChange = onWatchlistChange;
    this._controlsView.onWatchedChange = onWatchedChange;
    this._controlsView.onFavoriteChange = onFavoriteChange;
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
    const commentFormElement = this.element.querySelector('.film-details__inner');
    if (!(commentFormElement instanceof HTMLFormElement)) {
      throw new Error('No form element found');
    }

    const commentKeyUpHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
        evt.preventDefault();
        commentFormElement.requestSubmit();
        this.onCommentSubmit();
      }
    };

    const commentSubmitHandler = (evt: Event) => {
      evt.preventDefault();
    };

    commentFormElement.addEventListener('keyup', commentKeyUpHandler);
    commentFormElement.addEventListener('submit', commentSubmitHandler);

    this.element.addEventListener('keydown', ((evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.onClose();
      }
    }) as EventListener);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onClose(): void { }
  public onCommentSubmit(): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public deleteCommentCard(commentId: string): void {
    this._commentsView.deleteCommentCard(commentId);
  }

  public updateCommentsCount(): void {
    this._commentsView.updateCommentsCount(this._comments.length);
  }

  public resetNewCommentText(): void {
    this._commentsView.resetNewCommentText();
  }

  public resetSelectedEmotion(): void {
    this._commentsView.resetSelectedEmotion();
  }
}
