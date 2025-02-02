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
          <p class="statistic__item-text">${this._filmsCount}
            <span class="statistic__item-description">${this._filmsCount === 1 ? 'movie' : 'movies'}</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${hours} <span class="statistic__item-description">h</span>
            ${minutes} <span class="statistic__item-description">m</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._favoriteGenre}</p>
        </li>
      </ul>`;
  }
}
