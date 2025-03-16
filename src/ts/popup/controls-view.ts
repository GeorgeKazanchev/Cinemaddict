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
      <fieldset class="film-details__controls">
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
      </fieldset>`;
  }

  public get watchlistInputElement(): HTMLInputElement {
    const element = this.element.querySelector('#watchlist');
    if (!(element instanceof HTMLInputElement)) {
      throw new Error('No watchlist input found');
    }
    return element;
  }

  public get watchedInputElement(): HTMLInputElement {
    const element = this.element.querySelector('#watched');
    if (!(element instanceof HTMLInputElement)) {
      throw new Error('No watched input found');
    }
    return element;
  }

  public get favoriteInputElement(): HTMLInputElement {
    const element = this.element.querySelector('#favorite');
    if (!(element instanceof HTMLInputElement)) {
      throw new Error('No favorite input found');
    }
    return element;
  }

  public bind(): void {
    const watchlistButtonElement = this.element.querySelector('.film-details__control-label--watchlist');
    const watchedButtonElement = this.element.querySelector('.film-details__control-label--watched');
    const favoriteButtonElement = this.element.querySelector('.film-details__control-label--favorite');

    const watchlistClickHandler = () => {
      this.onWatchlistChange(this._getFilmFromModel());
    };

    const watchedClickHandler = () => {
      this.onWatchedChange(this._getFilmFromModel());
    };

    const favoriteClickHandler = () => {
      this.onFavoriteChange(this._getFilmFromModel());
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

  public updateWatchlistButton(): void {
    const { userDetails } = this._model.getFilmById(this._filmId);
    this.watchlistInputElement.checked = userDetails.inWatchlist;
  }

  public updateWatchedButton(): void {
    const { userDetails } = this._model.getFilmById(this._filmId);
    this.watchedInputElement.checked = userDetails.isWatched;
  }

  public updateFavoriteButton(): void {
    const { userDetails } = this._model.getFilmById(this._filmId);
    this.favoriteInputElement.checked = userDetails.isFavorite;
  }

  public makeControlsEnabled(isEnabled: boolean): void {
    if (!(this.element instanceof HTMLFieldSetElement)) {
      throw new Error('No controls container found');
    }
    this.element.disabled = !isEnabled;
  }

  private _getFilmFromModel(): Film {
    return this._model.getFilmById(this._filmId);
  }
}
