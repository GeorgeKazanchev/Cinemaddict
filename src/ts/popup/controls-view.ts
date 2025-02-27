import AbstractView from '../abstract-view';
import { Film } from '../model';
import Model from '../model/model';

type Props = {
  filmId: string;
  model: Model;
};

export default class ControlsView extends AbstractView {
  constructor({ model, filmId }: Props) {
    super();
    this._model = model;
    this._filmId = filmId;
  }

  private _model: Model;
  private _filmId: string;

  public get template(): string {
    const { userDetails } = this._model.getFilmById(this._filmId);

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
    const film = this._model.getFilmById(this._filmId);

    const watchlistButtonElement = this.element.querySelector('.film-details__control-label--watchlist');
    const watchedButtonElement = this.element.querySelector('.film-details__control-label--watched');
    const favoriteButtonElement = this.element.querySelector('.film-details__control-label--favorite');

    const watchlistClickHandler = () => {
      this.onWatchlistChange(film);
    };

    const watchedClickHandler = () => {
      this.onWatchedChange(film);
    };

    const favoriteClickHandler = () => {
      this.onFavoriteChange(film);
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
