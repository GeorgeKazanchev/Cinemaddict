import getFilmsScreen from './films-screen';
import Filter from './model/enums/filter';
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
import { getElementFromTemplate, getTargetAsElement, renderScreen } from './util';
import type Film from './model/types/film';

const inputValueToStatsPeriod = new Map<string, StatisticsPeriod>();
inputValueToStatsPeriod.set('all-time', StatisticsPeriod.AllTime);
inputValueToStatsPeriod.set('today', StatisticsPeriod.Today);
inputValueToStatsPeriod.set('week', StatisticsPeriod.Week);
inputValueToStatsPeriod.set('month', StatisticsPeriod.Month);
inputValueToStatsPeriod.set('year', StatisticsPeriod.Year);

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

  const element = getElementFromTemplate(content);

  element.querySelector('.statistic__filters')?.addEventListener('change', (evt: Event) => {
    const target = getTargetAsElement(evt);
    const inputElement = target.closest('.statistic__filters-input');
    if (!inputElement || !(inputElement instanceof HTMLInputElement)) {
      return;
    }

    const selectedPeriod = inputValueToStatsPeriod.get(inputElement.value);
    if (!selectedPeriod || selectedPeriod === period) {
      return;
    }

    renderScreen(getStatisticsScreen({ films, period: selectedPeriod }));
  });

  //  Обработчики кликов по кнопкам перехода на экран "Фильмы"
  element.querySelector('.main-navigation__item[href="#all"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    renderScreen(getFilmsScreen({ films }));
  });

  element.querySelector('.main-navigation__item[href="#watchlist"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    renderScreen(getFilmsScreen({ films, filter: Filter.Watchlist }));
  });

  element.querySelector('.main-navigation__item[href="#history"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    renderScreen(getFilmsScreen({ films, filter: Filter.Watched }));
  });

  element.querySelector('.main-navigation__item[href="#favorites"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    renderScreen(getFilmsScreen({ films, filter: Filter.Favorite }));
  });

  //  Отмена действия по умолчанию при клике по кнопке "Stats"
  element.querySelector('.main-navigation__additional')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
  });

  return element;
};

export default getStatisticsScreen;
