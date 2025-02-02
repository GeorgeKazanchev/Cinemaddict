import AbstractView from '../abstract-view';
import type UserDetails from '../../model/types/user-details';

type Props = {
  userDetails: UserDetails;
};

export default class ControlsView extends AbstractView {
  constructor({ userDetails }: Props) {
    super();
    this._userDetails = userDetails;
  }

  private _userDetails: UserDetails;

  public get template(): string {
    return `
      <section class="film-details__controls">
        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="watchlist"
          name="watchlist"
          ${this._userDetails.inWatchlist ? 'checked' : ''}
        >
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="watched"
          name="watched"
          ${this._userDetails.isWatched ? 'checked' : ''}
        >
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input
          type="checkbox"
          class="film-details__control-input visually-hidden"
          id="favorite"
          name="favorite"
          ${this._userDetails.isFavorite ? 'checked' : ''}
        >
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>`;
  }
}
