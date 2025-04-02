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
  private _filmsCountElement: Element | null = null;
  private _totalDurationElement: Element | null = null;
  private _favoriteGenreElement: Element | null = null;

  public get template(): string {
    const { filmsCount, totalDuration, favoriteGenre } = this._getStatisticsData();

    return `
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">
            ${StatisticsView._getFilmsCountTemplate(filmsCount)}
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${StatisticsView._getTotalDurationTemplate(totalDuration)}
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${favoriteGenre}</p>
        </li>
      </ul>`;
  }

  public get filmsCountElement(): Element {
    if (this._filmsCountElement) {
      return this._filmsCountElement;
    }
    const element = this.element.querySelector('.statistic__text-item:nth-child(1) .statistic__item-text');
    if (!element) {
      throw new Error('No films count element found in statistics');
    }
    this._filmsCountElement = element;
    return element;
  }

  public get totalDurationElement(): Element {
    if (this._totalDurationElement) {
      return this._totalDurationElement;
    }
    const element = this.element.querySelector('.statistic__text-item:nth-child(2) .statistic__item-text');
    if (!element) {
      throw new Error('No total duration element found in statistics');
    }
    this._totalDurationElement = element;
    return element;
  }

  public get favoriteGenreElement(): Element {
    if (this._favoriteGenreElement) {
      return this._favoriteGenreElement;
    }
    const element = this.element.querySelector('.statistic__text-item:nth-child(3) .statistic__item-text');
    if (!element) {
      throw new Error('No favorite genre element found in statistics');
    }
    this._favoriteGenreElement = element;
    return element;
  }

  public updateStatistics(): void {
    const { filmsCount, totalDuration, favoriteGenre } = this._getStatisticsData();
    this._updateFilmsCount(filmsCount);
    this._updateTotalDuration(totalDuration);
    this._updateFavoriteGenre(favoriteGenre);
  }

  private _updateFilmsCount(filmsCount: number): void {
    this.filmsCountElement.innerHTML = StatisticsView._getFilmsCountTemplate(filmsCount);
  }

  private _updateTotalDuration(totalDuration: number): void {
    this.totalDurationElement.innerHTML = StatisticsView._getTotalDurationTemplate(totalDuration);
  }

  private _updateFavoriteGenre(favoriteGenre: string): void {
    this.favoriteGenreElement.textContent = favoriteGenre;
  }

  private _getStatisticsData(): StatisticsData {
    const { watchedFilmsInPeriod } = this._model;
    return {
      filmsCount: watchedFilmsInPeriod.length,
      totalDuration: Statistics.getTotalDuration(watchedFilmsInPeriod),
      favoriteGenre: Statistics.getFavoriteGenre(watchedFilmsInPeriod),
    };
  }

  private static _getFilmsCountTemplate(filmsCount: number): string {
    return (
      `${filmsCount.toFixed(0)}
      <span class="statistic__item-description">${filmsCount === 1 ? 'movie' : 'movies'}</span>`
    );
  }

  private static _getTotalDurationTemplate(totalDuration: number): string {
    const { hours, minutes } = getDurationComponents(totalDuration);
    let template = hours > 0 ? `${hours.toFixed(0)} <span class="statistic__item-description">h</span>` : '';
    template += `${minutes.toFixed(0)} <span class="statistic__item-description">m</span>`;
    return template;
  }
}
