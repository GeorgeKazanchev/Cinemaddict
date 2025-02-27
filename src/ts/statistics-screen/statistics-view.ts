import AbstractView from '../abstract-view';
import { getDurationComponents, Statistics } from '../model';
import Model from '../model/model';

type StatisticsData = {
  favoriteGenre: string;
  filmsCount: number;
  totalDuration: number;
};

export default class StatisticsView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    const { filmsCount, totalDuration, favoriteGenre } = this._getStatisticsData();
    const { hours, minutes } = getDurationComponents(totalDuration);

    return `
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filmsCount.toFixed(0)}
            <span class="statistic__item-description">${filmsCount === 1 ? 'movie' : 'movies'}</span>
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
          <p class="statistic__item-text">${favoriteGenre}</p>
        </li>
      </ul>`;
  }

  public updateStatistics(): void {
    const { filmsCount, totalDuration, favoriteGenre } = this._getStatisticsData();
    this._updateFilmsCount(filmsCount);
    this._updateTotalDuration(totalDuration);
    this._updateFavoriteGenre(favoriteGenre);
  }

  private _updateFilmsCount(filmsCount: number): void {
    const filmsCountElement = this.element.querySelector('.statistic__text-item:nth-child(1) .statistic__item-text');
    if (filmsCountElement) {
      filmsCountElement.innerHTML = '';
      filmsCountElement.textContent = filmsCount.toFixed(0);

      const descriptionElement = document.createElement('span');
      descriptionElement.classList.add('statistic__item-description');
      descriptionElement.textContent = filmsCount === 1 ? 'movie' : 'movies';
      filmsCountElement.append(descriptionElement);
    }
  }

  private _updateTotalDuration(totalDuration: number): void {
    const durationElement = this.element.querySelector('.statistic__text-item:nth-child(2) .statistic__item-text');
    if (durationElement) {
      durationElement.innerHTML = '';

      const hoursDescriptionElement = document.createElement('span');
      const minutesDescriptionElement = document.createElement('span');
      hoursDescriptionElement.classList.add('statistic__item-description');
      minutesDescriptionElement.classList.add('statistic__item-description');
      hoursDescriptionElement.textContent = 'h';
      minutesDescriptionElement.textContent = 'm';

      const { hours, minutes } = getDurationComponents(totalDuration);
      durationElement.append(`${hours.toFixed(0)} `, hoursDescriptionElement);
      durationElement.append(`${minutes.toFixed(0)} `, minutesDescriptionElement);
    }
  }

  private _updateFavoriteGenre(favoriteGenre: string): void {
    const favoriteGenreElement = this.element.querySelector('.statistic__text-item:nth-child(3) .statistic__item-text');
    if (favoriteGenreElement) {
      favoriteGenreElement.innerHTML = '';
      favoriteGenreElement.textContent = favoriteGenre;
    }
  }

  private _getStatisticsData(): StatisticsData {
    const { watchedFilmsInPeriod } = this._model;
    return {
      filmsCount: watchedFilmsInPeriod.length,
      totalDuration: Statistics.getTotalDuration(watchedFilmsInPeriod),
      favoriteGenre: Statistics.getFavoriteGenre(watchedFilmsInPeriod),
    };
  }
}
