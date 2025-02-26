import FilmsScreen from '../films-screen/films-screen';
import Header from '../header/header';
import {
  getRank,
  Film,
  Filter,
  Statistics,
  StatisticsPeriod,
} from '../model';
import NavigationPanelView from '../navigation-panel-view';
import { render } from '../util';
import ChartView from './chart-view';
import FiltersView from './filters-view';
import RankView from './rank-view';
import StatisticsView from './statistics-view';

type Props = {
  films: Film[];
  header: Header;
  mainElement: Element;
  period?: StatisticsPeriod;
};

export default class StatisticsScreen {
  constructor({
    films, period, mainElement, header,
  }: Props) {
    this._films = films;
    this._period = period ?? StatisticsPeriod.AllTime;
    this._mainElement = mainElement;
    this._header = header;

    const filmsSummary = Statistics.getFilmsSummary(this._films);
    const watchedFilmsInPeriod = this._getWatchedFilmsInPeriod();
    const filmsCount = watchedFilmsInPeriod.length;
    const totalDuration = Statistics.getTotalDuration(watchedFilmsInPeriod);
    const favoriteGenre = Statistics.getFavoriteGenre(watchedFilmsInPeriod);

    this._rankView = new RankView({ rank: getRank(filmsSummary.watchedFilmsCount) });
    this._filtersView = new FiltersView({ period: this._period });
    this._statisticsView = new StatisticsView({ filmsCount, totalDuration, favoriteGenre });
    this._chartView = new ChartView({ films: watchedFilmsInPeriod });
    this._navigationPanelView = new NavigationPanelView({
      filmsSummary,
      isFilmsScreen: false,
    });

    this._navigationPanelView.onFiltration = this._onFiltration.bind(this);
    this._filtersView.onPeriodChanged = this._onPeriodChanged.bind(this);
  }

  private _films: Film[];
  private _period: StatisticsPeriod;
  private _navigationPanelView: NavigationPanelView;
  private _rankView: RankView;
  private _filtersView: FiltersView;
  private _statisticsView: StatisticsView;
  private _chartView: ChartView;
  private _element: Element | null = null;
  private _mainElement: Element;
  private _header: Header;

  public get element(): Element {
    if (this._element) {
      return this._element;
    }

    this._element = document.createElement('div');
    this._element.append(this._navigationPanelView.element);

    const sectionElement = document.createElement('section');
    sectionElement.classList.add('statistic');
    sectionElement.append(this._rankView.element);
    sectionElement.append(this._filtersView.element);
    sectionElement.append(this._statisticsView.element);

    const filmsCount = this._getWatchedFilmsInPeriod().length;
    if (filmsCount > 0) {
      sectionElement.append(this._chartView.element);
    }

    this._element.append(sectionElement);
    return this._element;
  }

  private _onFiltration(selectedFilter: Filter): void {
    const filmsScreen = new FilmsScreen({
      films: this._films,
      filter: selectedFilter,
      mainElement: this._mainElement,
      header: this._header,
    });
    render(filmsScreen.element, this._mainElement);
  }

  private _onPeriodChanged(selectedPeriod: StatisticsPeriod): void {
    if (this._period !== selectedPeriod) {
      this._period = selectedPeriod;

      const watchedFilmsInPeriod = this._getWatchedFilmsInPeriod();
      const filmsCount = watchedFilmsInPeriod.length;
      const totalDuration = Statistics.getTotalDuration(watchedFilmsInPeriod);
      const favoriteGenre = Statistics.getFavoriteGenre(watchedFilmsInPeriod);

      this._filtersView.updateActivePeriod(this._period);
      this._statisticsView.updateStatistics(favoriteGenre, filmsCount, totalDuration);
      this._chartView.updateChart(watchedFilmsInPeriod);
    }
  }

  private _getWatchedFilmsInPeriod(): Film[] {
    const statisticsStartDate = Statistics.getStatisticsStartDate(this._period);
    const watchedFilmsInPeriod = Statistics.getWatchedFilmsSince(statisticsStartDate, this._films);
    return watchedFilmsInPeriod;
  }
}
