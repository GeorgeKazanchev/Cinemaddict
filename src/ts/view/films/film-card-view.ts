import getFormattedDuration from '../../model/get-formatted-duration';
import getLimitedDescription from '../../model/get-limited-description';
import getRatingClassname from '../../model/get-rating-classname';
import AbstractView from '../abstract-view';
import type Film from '../../model/types/film';

const BUTTON_ACTIVE_CLASSNAME = 'film-card__controls-item--active';

type Props = {
  film: Film;
};

export default class FilmCardView extends AbstractView {
  constructor({ film }: Props) {
    super();
    this._film = film;
  }

  private _film: Film;

  public get filmId(): string {
    return this._film.id;
  }

  public get template(): string {
    const commentsCount = this._film.commentsIds.length;
    const { info, userDetails } = this._film;

    return `
      <article class="film-card">
        <h3 class="film-card__title">${info.title}</h3>
        <p class="${getRatingClassname(info.rating, 'film-card__rating')}">${info.rating.toFixed(1)}</p>
        <p class="film-card__info">
          <span class="film-card__year">${info.release.date.getFullYear()}</span>
          <span class="film-card__duration">${getFormattedDuration(info.durationMinutes)}</span>
          <span class="film-card__genre">${info.genres.join(', ')}</span>
        </p>
        <img src="${info.posterSrc}" alt="${info.title}" class="film-card__poster">
        <p class="film-card__description">${getLimitedDescription(info.description)}</p>
        <a class="link film-card__comments">${commentsCount} ${commentsCount === 1 ? 'comment' : 'comments'}</a>
        <div class="film-card__controls">
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
        </div>
      </article>`;
  }

  public bind(): void {
    const titleElement = this.element.querySelector('.film-card__title');
    const posterElement = this.element.querySelector('.film-card__poster');
    const commentsElement = this.element.querySelector('.film-card__comments');

    const watchlistButtonElement = this.element.querySelector('.film-card__controls-item--add-to-watchlist');
    const watchedButtonElement = this.element.querySelector('.film-card__controls-item--mark-as-watched');
    const favoriteButtonElement = this.element.querySelector('.film-card__controls-item--favorite');

    const popupOpenHandler = (evt: Event) => {
      evt.preventDefault();
      this.onPopupOpen(this._film);
    };

    const watchlistClickHandler = (evt: Event) => {
      evt.preventDefault();
      watchlistButtonElement?.classList.toggle(BUTTON_ACTIVE_CLASSNAME);
      this.onWatchlistChange(this._film);
    };

    const watchedClickHandler = (evt: Event) => {
      evt.preventDefault();
      watchedButtonElement?.classList.toggle(BUTTON_ACTIVE_CLASSNAME);
      this.onWatchedChange(this._film);
    };

    const favoriteClickHandler = (evt: Event) => {
      evt.preventDefault();
      favoriteButtonElement?.classList.toggle(BUTTON_ACTIVE_CLASSNAME);
      this.onFavoriteChange(this._film);
    };

    titleElement?.addEventListener('click', popupOpenHandler);
    posterElement?.addEventListener('click', popupOpenHandler);
    commentsElement?.addEventListener('click', popupOpenHandler);
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
}
