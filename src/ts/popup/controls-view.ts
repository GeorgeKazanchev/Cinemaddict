import AbstractView from '../abstract-view';
import { loadElementLazy } from '../dom-util';
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
  private _watchlistInputElement: HTMLInputElement | null = null;
  private _watchedInputElement: HTMLInputElement | null = null;
  private _favoriteInputElement: HTMLInputElement | null = null;

  public get template(): string {
    const { userDetails } = this._model.getFilmById(this._filmId);

    return `
      <fieldset class="film-details__controls">
        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="watchlist"
          aria-labelledby="watchlist-label"
          name="watchlist"
          ${userDetails.inWatchlist ? 'checked' : ''}
          tabindex="-1"
        >
        <label
          for="watchlist"
          id="watchlist-label"
          class="film-details__control-label film-details__control-label--watchlist"
          tabindex="0"
        >
          <svg class="film-details__control-icon film-details__control-icon--watchlist" width="17" height="17" role="img">
            <use xlink:href="img/sprite.svg#watchlist-icon"></use>
          </svg>
          Add to watchlist
        </label>

        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="watched"
          aria-labelledby="watched-label"
          name="watched"
          ${userDetails.isWatched ? 'checked' : ''}
          tabindex="-1"
        >
        <label
          for="watched"
          id="watched-label"
          class="film-details__control-label film-details__control-label--watched"
          tabindex="0"
        >
          <svg class="film-details__control-icon film-details__control-icon--watched" width="14" height="10" role="img">
            <use xlink:href="img/sprite.svg#watched-icon"></use>
          </svg>
          Already watched
        </label>

        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="favorite"
          aria-labelledby="favorite-label"
          name="favorite"
          ${userDetails.isFavorite ? 'checked' : ''}
          tabindex="-1"
        >
        <label
          for="favorite"
          id="favorite-label"
          class="film-details__control-label film-details__control-label--favorite"
          tabindex="0"
        >
          <svg class="film-details__control-icon film-details__control-icon--favorite" width="18" height="18" role="img">
            <use xlink:href="img/sprite.svg#favorite-icon"></use>
          </svg>
          Add to favorites
        </label>
      </fieldset>`;
  }

  public get watchlistInputElement(): HTMLInputElement {
    this._watchlistInputElement = loadElementLazy(
      this._watchlistInputElement,
      this.element,
      '#watchlist',
      'No watchlist input element found',
    ) as HTMLInputElement;
    return this._watchlistInputElement;
  }

  public get watchedInputElement(): HTMLInputElement {
    this._watchedInputElement = loadElementLazy(
      this._watchedInputElement,
      this.element,
      '#watched',
      'No watched input element found',
    ) as HTMLInputElement;
    return this._watchedInputElement;
  }

  public get favoriteInputElement(): HTMLInputElement {
    this._favoriteInputElement = loadElementLazy(
      this._favoriteInputElement,
      this.element,
      '#favorite',
      'No favorite input element found',
    ) as HTMLInputElement;
    return this._favoriteInputElement;
  }

  public bind(): void {
    const watchlistButtonElement = this.element.querySelector('.film-details__control-label--watchlist');
    const watchedButtonElement = this.element.querySelector('.film-details__control-label--watched');
    const favoriteButtonElement = this.element.querySelector('.film-details__control-label--favorite');

    const watchlistClickHandler = (): void => {
      this.onWatchlistChange(this._getFilmFromModel());
    };

    const watchedClickHandler = (): void => {
      this.onWatchedChange(this._getFilmFromModel());
    };

    const favoriteClickHandler = (): void => {
      this.onFavoriteChange(this._getFilmFromModel());
    };

    const watchlistKeydownHandler = (evt: KeyboardEvent): void => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        this.onWatchlistChange(this._getFilmFromModel());
      }
    };

    const watchedKeydownHandler = (evt: KeyboardEvent): void => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        this.onWatchedChange(this._getFilmFromModel());
      }
    };

    const favoriteKeydownHandler = (evt: KeyboardEvent): void => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        this.onFavoriteChange(this._getFilmFromModel());
      }
    };

    watchlistButtonElement?.addEventListener('click', watchlistClickHandler);
    watchedButtonElement?.addEventListener('click', watchedClickHandler);
    favoriteButtonElement?.addEventListener('click', favoriteClickHandler);
    watchlistButtonElement?.addEventListener('keydown', watchlistKeydownHandler as EventListener);
    watchedButtonElement?.addEventListener('keydown', watchedKeydownHandler as EventListener);
    favoriteButtonElement?.addEventListener('keydown', favoriteKeydownHandler as EventListener);
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
