import getDurationComponents from '../../model/get-duration-components';
import AbstractView from '../abstract-view';

type Props = {
  favoriteGenre: string;
  filmsCount: number;
  totalDuration: number;
};

export default class StatisticsView extends AbstractView {
  constructor({
    favoriteGenre,
    filmsCount,
    totalDuration,
  }: Props) {
    super();
    this._favoriteGenre = favoriteGenre;
    this._filmsCount = filmsCount;
    this._totalDuration = totalDuration;
  }

  private _favoriteGenre: string;
  private _filmsCount: number;
  private _totalDuration: number;

  public get template(): string {
    const { hours, minutes } = getDurationComponents(this._totalDuration);

    return `
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${this._filmsCount.toFixed(0)}
            <span class="statistic__item-description">${this._filmsCount === 1 ? 'movie' : 'movies'}</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${hours.toFixed(0)} <span class="statistic__item-description">h</span>
            ${minutes.toFixed(0)} <span class="statistic__item-description">m</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._favoriteGenre}</p>
        </li>
      </ul>`;
  }

  public updateStatistics(
    favoriteGenre: string,
    filmsCount: number,
    totalDuration: number,
  ): void {
    this._updateFilmsCount(filmsCount);
    this._updateTotalDuration(totalDuration);
    this._updateFavoriteGenre(favoriteGenre);
  }

  private _updateFilmsCount(filmsCount: number): void {
    this._filmsCount = filmsCount;

    const filmsCountElement = this.element.querySelector('.statistic__text-item:nth-child(1) .statistic__item-text');
    if (filmsCountElement) {
      filmsCountElement.innerHTML = '';
      filmsCountElement.textContent = this._filmsCount.toFixed(0);

      const descriptionElement = document.createElement('span');
      descriptionElement.classList.add('statistic__item-description');
      descriptionElement.textContent = this._filmsCount === 1 ? 'movie' : 'movies';
      filmsCountElement.append(descriptionElement);
    }
  }

  private _updateTotalDuration(totalDuration: number): void {
    this._totalDuration = totalDuration;

    const durationElement = this.element.querySelector('.statistic__text-item:nth-child(2) .statistic__item-text');
    if (durationElement) {
      durationElement.innerHTML = '';

      const hoursDescriptionElement = document.createElement('span');
      const minutesDescriptionElement = document.createElement('span');
      hoursDescriptionElement.classList.add('statistic__item-description');
      minutesDescriptionElement.classList.add('statistic__item-description');
      hoursDescriptionElement.textContent = 'h';
      minutesDescriptionElement.textContent = 'm';

      const { hours, minutes } = getDurationComponents(this._totalDuration);
      durationElement.append(`${hours.toFixed(0)} `, hoursDescriptionElement);
      durationElement.append(`${minutes.toFixed(0)} `, minutesDescriptionElement);
    }
  }

  private _updateFavoriteGenre(favoriteGenre: string): void {
    this._favoriteGenre = favoriteGenre;

    const favoriteGenreElement = this.element.querySelector('.statistic__text-item:nth-child(3) .statistic__item-text');
    if (favoriteGenreElement) {
      favoriteGenreElement.innerHTML = '';
      favoriteGenreElement.textContent = this._favoriteGenre;
    }
  }
}
