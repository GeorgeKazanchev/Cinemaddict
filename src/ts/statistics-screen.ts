import StatisticsPeriod from './model/enums/statistics-period';
import getDurationComponents from './model/get-duration-components';
import getRank from './model/get-rank';
import {
  getFavoriteGenre,
  getFilmsSummary,
  getStatisticsStartDate,
  getTotalDuration,
  getWatchedFilmsSince,
} from './model/get-statistics';
import getNavigationPanel from './navigation-panel';
import { getElementFromTemplate } from './util';
import type Film from './model/types/film';

type Props = {
  films: Film[];
  period?: StatisticsPeriod;
};

const getStatisticsScreen = ({
  films,
  period = StatisticsPeriod.AllTime,
}: Props): Element => {
  const filmsSummary = getFilmsSummary(films);

  const navigationPanel = getNavigationPanel({
    filmsSummary,
    isFilmsScreen: false,
  }).outerHTML;

  const rank = `
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="img/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getRank(filmsSummary.watchedFilmsCount)}</span>
    </p>`;

  const filters = `
    <form action="#" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input
        type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-all-time"
        value="all-time"
        ${period === StatisticsPeriod.AllTime ? 'checked' : ''}
      >
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input
        type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-today"
        value="today"
        ${period === StatisticsPeriod.Today ? 'checked' : ''}
      >
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input
        type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-week"
        value="week"
        ${period === StatisticsPeriod.Week ? 'checked' : ''}
      >
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input
        type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-month"
        value="month"
        ${period === StatisticsPeriod.Month ? 'checked' : ''}
      >
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input
        type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-year"
        value="year"
        ${period === StatisticsPeriod.Year ? 'checked' : ''}
      >
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>`;

  const statisticsStartDate = getStatisticsStartDate(period);
  const watchedFilmsInPeriod = getWatchedFilmsSince(statisticsStartDate, films);

  const filmsCount = watchedFilmsInPeriod.length;
  const totalDuration = getTotalDuration(watchedFilmsInPeriod);
  const favoriteGenre = getFavoriteGenre(watchedFilmsInPeriod);
  const { hours, minutes } = getDurationComponents(totalDuration);

  const statistics = `
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filmsCount}
          <span class="statistic__item-description">${filmsCount === 1 ? 'movie' : 'movies'}</span>
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
        <p class="statistic__item-text">${favoriteGenre}</p>
      </li>
    </ul>`;

  const content = `
    <div>
      ${navigationPanel}
      <section class="statistic">
        ${rank}
        ${filters}
        ${statistics}
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>
    </div>`;

  return getElementFromTemplate(content);
};

export default getStatisticsScreen;
