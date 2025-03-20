import AbstractView from '../abstract-view';
import {
  getFormattedDuration, getLimitedDescription, getRatingClassname, Film,
} from '../model';
import Model from '../model/model';

const BUTTON_ACTIVE_CLASSNAME = 'film-card__controls-item--active';

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

  public get filmId(): string {
    return this._filmId;
  }

  public get template(): string {
    const commentsCount = this._model.getCommentsCount(this._filmId);
    const { info, userDetails } = this._model.getFilmById(this.filmId);

    return `
      <article class="film-card">
        <h3 class="film-card__title" tabindex="0">${info.title}</h3>
        <p class="${getRatingClassname(info.rating, 'film-card__rating')}">${info.rating.toFixed(1)}</p>
        <p class="film-card__info">
          <span class="film-card__year">${info.release.date.getFullYear()}</span>
          <span class="film-card__duration">${getFormattedDuration(info.durationMinutes)}</span>
          <span class="film-card__genre">${info.genres.join(', ')}</span>
        </p>
        <img class="film-card__poster" src="${info.posterSrc}" alt="${info.title}" tabindex="0">
        <p class="film-card__description">${getLimitedDescription(info.description)}</p>
        <a class="link film-card__comments">${this._getCommentsCountText(commentsCount)}</a>
        <form action="#" method="post" autocomplete="off">
          <fieldset class="film-card__controls">
            <button
              class="film-card__controls-item button film-card__controls-item--add-to-watchlist
                ${userDetails.inWatchlist ? BUTTON_ACTIVE_CLASSNAME : ''}"
              type="button"
            >
              Add to watchlist
            </button>
            <button
              class="film-card__controls-item button film-card__controls-item--mark-as-watched
                ${userDetails.isWatched ? BUTTON_ACTIVE_CLASSNAME : ''}"
              type="button"
            >
              Mark as watched
            </button>
            <button
              class="film-card__controls-item button film-card__controls-item--favorite
                ${userDetails.isFavorite ? BUTTON_ACTIVE_CLASSNAME : ''}"
              type="button"
            >
              Mark as favorite
            </button>
          </fieldset>
        </form>
      </article>`;
  }

  public get controlsContainerElement() {
    if (this._controlsContainerElement) {
      return this._controlsContainerElement;
    }

    const element = this.element.querySelector('.film-card__controls');
    if (!(element instanceof HTMLFieldSetElement)) {
      throw new Error('No controls container found');
    }

    this._controlsContainerElement = element;
    return element;
  }

  public bind(): void {
    const titleElement = this.element.querySelector('.film-card__title');
    const posterElement = this.element.querySelector('.film-card__poster');
    const commentsElement = this.element.querySelector('.film-card__comments');

    const watchlistButtonElement = this.element.querySelector('.film-card__controls-item--add-to-watchlist');
    const watchedButtonElement = this.element.querySelector('.film-card__controls-item--mark-as-watched');
    const favoriteButtonElement = this.element.querySelector('.film-card__controls-item--favorite');

    const popupOpenClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onPopupOpen(this._getFilmFromModel());
    };

    const popupOpenKeydownHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        this.onPopupOpen(this._getFilmFromModel());
      }
    };

    const watchlistClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onWatchlistChange(this._getFilmFromModel());
    };

    const watchedClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onWatchedChange(this._getFilmFromModel());
    };

    const favoriteClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onFavoriteChange(this._getFilmFromModel());
    };

    titleElement?.addEventListener('click', popupOpenClickHandler);
    posterElement?.addEventListener('click', popupOpenClickHandler);
    commentsElement?.addEventListener('click', popupOpenClickHandler);
    titleElement?.addEventListener('keydown', popupOpenKeydownHandler as EventListener);
    posterElement?.addEventListener('keydown', popupOpenKeydownHandler as EventListener);
    commentsElement?.addEventListener('keydown', popupOpenKeydownHandler as EventListener);
    watchlistButtonElement?.addEventListener('click', watchlistClickHandler);
    watchedButtonElement?.addEventListener('click', watchedClickHandler);
    favoriteButtonElement?.addEventListener('click', favoriteClickHandler);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onPopupOpen(film: Film): void { }
  public onWatchlistChange(film: Film): void { }
  public onWatchedChange(film: Film): void { }
  public onFavoriteChange(film: Film): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public updateWatchlistButton(): void {
    const watchlistButtonElement = this.element.querySelector('.film-card__controls-item--add-to-watchlist');
    watchlistButtonElement?.classList.toggle(BUTTON_ACTIVE_CLASSNAME);
  }

  public updateWatchedButton(): void {
    const watchedButtonElement = this.element.querySelector('.film-card__controls-item--mark-as-watched');
    watchedButtonElement?.classList.toggle(BUTTON_ACTIVE_CLASSNAME);
  }

  public updateFavoriteButton(): void {
    const favoriteButtonElement = this.element.querySelector('.film-card__controls-item--favorite');
    favoriteButtonElement?.classList.toggle(BUTTON_ACTIVE_CLASSNAME);
  }

  public updateCommentsCount(): void {
    const commentsCount = this._model.getComments(this._filmId).length;
    const commentsCountElement = this.element.querySelector('.film-card__comments');
    if (commentsCountElement) {
      commentsCountElement.textContent = this._getCommentsCountText(commentsCount);
    }
  }

  public makeControlsEnabled(isEnabled: boolean): void {
    this.controlsContainerElement.disabled = !isEnabled;
  }

  public shakeControls(): void {
    // Здесь используется хак, чтобы форма могла "трястить" более одного раза
    this.controlsContainerElement.classList.remove('film-card__controls--error');
    this.controlsContainerElement.scrollBy(0, 0);
    this.controlsContainerElement.classList.add('film-card__controls--error');
  }

  private _getCommentsCountText(count: number): string {
    return `${count} ${count === 1 ? 'comment' : 'comments'}`;
  }

  private _getFilmFromModel(): Film {
    return this._model.getFilmById(this._filmId);
  }
}
