import AbstractView from '../abstract-view';
import { Handlers } from '../model';
import Model from '../model/model';
import CloseButtonView from './close-button-view';
import CommentsView from './comments-view';
import ControlsView from './controls-view';
import InfoView from './info-view';

type Props = {
  filmId: string;
  model: Model;
  onClose: Handlers.NoParamHandler;
  onCommentDelete: Handlers.CommentDeleteHandler;
  onFavoriteChange: Handlers.FilmControlsHandler;
  onWatchedChange: Handlers.FilmControlsHandler;
  onWatchlistChange: Handlers.FilmControlsHandler;
};

export default class PopupView extends AbstractView {
  constructor({
    model,
    filmId,
    onClose,
    onWatchlistChange,
    onWatchedChange,
    onFavoriteChange,
    onCommentDelete,
  }: Props) {
    super();
    this._model = model;
    this._filmId = filmId;

    this._closeButtonView = new CloseButtonView();
    this._infoView = new InfoView({ model: this._model, filmId: this._filmId });
    this._controlsView = new ControlsView({ model: this._model, filmId: this._filmId });
    this._commentsView = new CommentsView({
      model: this._model,
      filmId: this._filmId,
      onCommentDelete,
    });

    this.onClose = onClose;

    this._closeButtonView.onClose = onClose;
    this._controlsView.onWatchlistChange = onWatchlistChange;
    this._controlsView.onWatchedChange = onWatchedChange;
    this._controlsView.onFavoriteChange = onFavoriteChange;
  }

  private _model: Model;
  private _filmId: string;
  private _closeButtonView: CloseButtonView;
  private _infoView: InfoView;
  private _controlsView: ControlsView;
  private _commentsView: CommentsView;

  public get template(): string {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="#" method="post" autocomplete="off">
          <div class="film-details__top-container"></div>
          <div class="film-details__bottom-container"></div>
        </form>
      </section>`;
  }

  public get element(): Element {
    const element = this.createElementLazy();

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
      }
    };

    const commentSubmitHandler = (evt: Event) => {
      evt.preventDefault();
      this.onCommentSubmit();
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

  public onClose(): void { }
  public onCommentSubmit(): void { }

  public getNewCommentText(): string {
    return this._commentsView.getNewCommentText();
  }

  public getNewCommentEmotion(): string {
    return this._commentsView.getNewCommentEmotion();
  }

  public updateWatchlistButton(): void {
    this._controlsView.updateWatchlistButton();
  }

  public updateWatchedButton(): void {
    this._controlsView.updateWatchedButton();
  }

  public updateFavoriteButton(): void {
    this._controlsView.updateFavoriteButton();
  }

  public updateShownComments(): void {
    this._commentsView.updateShownComments();
  }

  public updateCommentsCount(): void {
    this._commentsView.updateCommentsCount();
  }

  public makeControlsEnabled(isEnabled: boolean): void {
    this._controlsView.makeControlsEnabled(isEnabled);
  }

  public makeDeleteButtonEnabled(commentId: string, isEnabled: boolean): void {
    this._commentsView.makeDeleteButtonEnabled(commentId, isEnabled);
  }

  public makeCommentFormEnabled(isEnabled: boolean): void {
    this._commentsView.makeCommentFormEnabled(isEnabled);
  }

  public resetNewCommentText(): void {
    this._commentsView.resetNewCommentText();
  }

  public resetNewCommentEmotion(): void {
    this._commentsView.resetNewCommentEmotion();
  }

  public shakeCommentForm(): void {
    this._commentsView.shakeCommentForm();
  }
}
