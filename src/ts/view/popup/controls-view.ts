import AbstractView from '../abstract-view';
import type Film from '../../model/types/film';

type Props = {
  film: Film;
};

export default class ControlsView extends AbstractView {
  constructor({ film }: Props) {
    super();
    this._film = film;
  }

  private _film: Film;

  public get template(): string {
    const { userDetails } = this._film;

    return `
      <section class="film-details__controls">
        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="watchlist"
          name="watchlist"
          ${userDetails.inWatchlist ? 'checked' : ''}
        >
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="watched"
          name="watched"
          ${userDetails.isWatched ? 'checked' : ''}
        >
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="favorite"
          name="favorite"
          ${userDetails.isFavorite ? 'checked' : ''}
        >
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>`;
  }

  public bind(): void {
    const watchlistButtonElement = this.element.querySelector('.film-details__control-label--watchlist');
    const watchedButtonElement = this.element.querySelector('.film-details__control-label--watched');
    const favoriteButtonElement = this.element.querySelector('.film-details__control-label--favorite');

    const watchlistClickHandler = () => {
      this.onWatchlistChange(this._film);
    };

    const watchedClickHandler = () => {
      this.onWatchedChange(this._film);
    };

    const favoriteClickHandler = () => {
      this.onFavoriteChange(this._film);
    };

    watchlistButtonElement?.addEventListener('click', watchlistClickHandler);
    watchedButtonElement?.addEventListener('click', watchedClickHandler);
    favoriteButtonElement?.addEventListener('click', favoriteClickHandler);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onWatchlistChange(film: Film): void { }
  public onWatchedChange(film: Film): void { }
  public onFavoriteChange(film: Film): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
