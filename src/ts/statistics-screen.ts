import getFilmsScreen from './films-screen';
import Filter from './model/enums/filter';
import StatisticsPeriod from './model/enums/statistics-period';
import getRank from './model/get-rank';
import {
  getFavoriteGenre,
  getFilmsSummary,
  getStatisticsStartDate,
  getTotalDuration,
  getWatchedFilmsSince,
} from './model/get-statistics';
import { renderScreen } from './util';
import NavigationPanelView from './view/navigation-panel-view';
import {
  ChartView, FiltersView, RankView, StatisticsView,
} from './view/statistics';
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
  const statisticsStartDate = getStatisticsStartDate(period);
  const watchedFilmsInPeriod = getWatchedFilmsSince(statisticsStartDate, films);

  const filmsCount = watchedFilmsInPeriod.length;
  const totalDuration = getTotalDuration(watchedFilmsInPeriod);
  const favoriteGenre = getFavoriteGenre(watchedFilmsInPeriod);

  const navigationPanelView = new NavigationPanelView({
    filmsSummary,
    isFilmsScreen: false,
  });

  const rankView = new RankView({ rank: getRank(filmsSummary.watchedFilmsCount) });
  const filtersView = new FiltersView({ period });
  const statisticsView = new StatisticsView({ filmsCount, totalDuration, favoriteGenre });
  const chartView = new ChartView({ films: watchedFilmsInPeriod });

  navigationPanelView.onFiltration = (selectedFilter: Filter) => {
    renderScreen(getFilmsScreen({ films, filter: selectedFilter }));
  };

  filtersView.onPeriodChanged = (selectedPeriod: StatisticsPeriod) => {
    if (period !== selectedPeriod) {
      renderScreen(getStatisticsScreen({ films, period: selectedPeriod }));
    }
  };

  const element = document.createElement('div');
  element.append(navigationPanelView.element);

  const sectionElement = document.createElement('section');
  sectionElement.classList.add('statistic');
  sectionElement.append(rankView.element);
  sectionElement.append(filtersView.element);
  sectionElement.append(statisticsView.element);
  if (filmsCount > 0) {
    sectionElement.append(chartView.element);
  }

  element.append(sectionElement);
  return element;
};

export default getStatisticsScreen;
