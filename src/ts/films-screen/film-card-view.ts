import AbstractView from '../abstract-view';
import { loadElementLazy, shakeElement } from '../dom-util';
import {
  getFormattedDuration, getLimitedDescription, getRatingClassname, Film,
} from '../model';
import Model from '../model/model';

const BUTTON_ACTIVE_CLASSNAME = 'film-card__controls-item--active';
const CONTROLS_ERROR_CLASSNAME = 'film-card__controls--error';

type Props = {
  filmId: string;
  model: Model;
};

export default class FilmCardView extends AbstractView {
  constructor({ model, filmId }: Props) {
    super();
    this._model = model;
    this._filmId = filmId;
  }

  private _model: Model;
  private _filmId: string;
  private _controlsContainerElement: HTMLFieldSetElement | null = null;
  private _commentsCountElement: Element | null = null;
  private _watchlistButtonElement: Element | null = null;
  private _watchedButtonElement: Element | null = null;
  private _favoriteButtonElement: Element | null = null;

  public get filmId(): string {
    return this._filmId;
  }

  public get template(): string {
    const commentsCount = this._model.getCommentsCount(this._filmId);
    const { info, userDetails } = this._model.getFilmById(this.filmId);

    return `
      <article class="film-card">
        <img class="film-card__poster" src="${info.posterSrc}" alt="${info.title}" width="230" height="340" tabindex="0">
        <div class="film-card__info-wrap">
          <h3 class="film-card__title" tabindex="0">${info.title}</h3>
          <p class="${getRatingClassname(info.rating, 'film-card__rating')}">${info.rating.toFixed(1)}</p>
          <p class="film-card__info">
            <span class="film-card__year">${info.release.date.getFullYear()}</span>
            <span class="film-card__duration">${getFormattedDuration(info.durationMinutes)}</span>
            <span class="film-card__genre">${info.genres.join(', ')}</span>
          </p>
          <p class="film-card__description">${getLimitedDescription(info.description)}</p>
          <a class="link film-card__comments" href="#">${FilmCardView._getCommentsCountText(commentsCount)}</a>
        </div>
        <form action="#" method="post" autocomplete="off">
          <fieldset class="film-card__controls">
            <button
              class="button film-card__controls-item film-card__controls-item--watchlist
                ${userDetails.inWatchlist ? BUTTON_ACTIVE_CLASSNAME : ''}"
              type="button"
            >
              <svg class="film-card__controls-icon film-card__controls-icon--watchlist" width="17" height="17" role="img">
                <use xlink:href="img/sprite.svg#watchlist-icon"></use>
              </svg>
              Add to watchlist
            </button>

            <button
              class="button film-card__controls-item film-card__controls-item--watched
                ${userDetails.isWatched ? BUTTON_ACTIVE_CLASSNAME : ''}"
              type="button"
            >
              <svg class="film-card__controls-icon film-card__controls-icon--watched" width="14" height="10" role="img">
                <use xlink:href="img/sprite.svg#watched-icon"></use>
              </svg>
              Mark as watched
            </button>

            <button
              class="button film-card__controls-item film-card__controls-item--favorite
                ${userDetails.isFavorite ? BUTTON_ACTIVE_CLASSNAME : ''}"
              type="button"
            >
              <svg class="film-card__controls-icon film-card__controls-icon--favorite" width="18" height="18" role="img">
                <use xlink:href="img/sprite.svg#favorite-icon"></use>
              </svg>
              Mark as favorite
            </button>
          </fieldset>
        </form>
      </article>`;
  }

  public get controlsContainerElement(): HTMLFieldSetElement {
    this._controlsContainerElement = loadElementLazy(
      this._controlsContainerElement,
      this.element,
      '.film-card__controls',
      'No controls container found',
    ) as HTMLFieldSetElement;
    return this._controlsContainerElement;
  }

  public get commentsCountElement(): Element {
    this._commentsCountElement = loadElementLazy(
      this._commentsCountElement,
      this.element,
      '.film-card__comments',
      'No film card comments count element found',
    );
    return this._commentsCountElement;
  }

  public get watchlistButtonElement(): Element {
    this._watchlistButtonElement = loadElementLazy(
      this._watchlistButtonElement,
      this.element,
      '.film-card__controls-item--watchlist',
      'No "Add to watchlist" button found',
    );
    return this._watchlistButtonElement;
  }

  public get watchedButtonElement(): Element {
    this._watchedButtonElement = loadElementLazy(
      this._watchedButtonElement,
      this.element,
      '.film-card__controls-item--watched',
      'No "Mark as watched" button found',
    );
    return this._watchedButtonElement;
  }

  public get favoriteButtonElement(): Element {
    this._favoriteButtonElement = loadElementLazy(
      this._favoriteButtonElement,
      this.element,
      '.film-card__controls-item--favorite',
      'No "Add to favorites" button found',
    );
    return this._favoriteButtonElement;
  }

  public bind(): void {
    const titleElement = this.element.querySelector('.film-card__title');
    const posterElement = this.element.querySelector('.film-card__poster');

    const popupOpenClickHandler = (evt: Event): void => {
      evt.preventDefault();
      this.onPopupOpen(this._getFilmFromModel());
    };

    const popupOpenEnterPressHandler = (evt: KeyboardEvent): void => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        this.onPopupOpen(this._getFilmFromModel());
      }
    };

    const watchlistClickHandler = (evt: Event): void => {
      evt.preventDefault();
      this.onWatchlistChange(this._getFilmFromModel());
    };

    const watchedClickHandler = (evt: Event): void => {
      evt.preventDefault();
      this.onWatchedChange(this._getFilmFromModel());
    };

    const favoriteClickHandler = (evt: Event): void => {
      evt.preventDefault();
      this.onFavoriteChange(this._getFilmFromModel());
    };

    titleElement?.addEventListener('click', popupOpenClickHandler);
    posterElement?.addEventListener('click', popupOpenClickHandler);
    this.commentsCountElement.addEventListener('click', popupOpenClickHandler);

    titleElement?.addEventListener('keydown', popupOpenEnterPressHandler as EventListener);
    posterElement?.addEventListener('keydown', popupOpenEnterPressHandler as EventListener);
    this.commentsCountElement.addEventListener('keydown', popupOpenEnterPressHandler as EventListener);

    this.watchlistButtonElement.addEventListener('click', watchlistClickHandler);
    this.watchedButtonElement.addEventListener('click', watchedClickHandler);
    this.favoriteButtonElement.addEventListener('click', favoriteClickHandler);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onPopupOpen(film: Film): void { }
  public onWatchlistChange(film: Film): void { }
  public onWatchedChange(film: Film): void { }
  public onFavoriteChange(film: Film): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public updateWatchlistButton(): void {
    FilmCardView._toggleButtonSelection(this.watchlistButtonElement);
  }

  public updateWatchedButton(): void {
    FilmCardView._toggleButtonSelection(this.watchedButtonElement);
  }

  public updateFavoriteButton(): void {
    FilmCardView._toggleButtonSelection(this.favoriteButtonElement);
  }

  public updateCommentsCount(): void {
    const commentsCount = this._model.getCommentsCount(this._filmId);
    this.commentsCountElement.textContent = FilmCardView._getCommentsCountText(commentsCount);
  }

  public makeControlsEnabled(isEnabled: boolean): void {
    this.controlsContainerElement.disabled = !isEnabled;
  }

  public shakeControls(): void {
    shakeElement(this.controlsContainerElement, CONTROLS_ERROR_CLASSNAME);
  }

  private _getFilmFromModel(): Film {
    return this._model.getFilmById(this._filmId);
  }

  private static _getCommentsCountText(count: number): string {
    return `${count} ${count === 1 ? 'comment' : 'comments'}`;
  }

  private static _toggleButtonSelection(element: Element): void {
    element.classList.toggle(BUTTON_ACTIVE_CLASSNAME);
  }
}
