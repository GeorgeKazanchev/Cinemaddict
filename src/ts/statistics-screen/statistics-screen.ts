import Application from '../application';
import FooterView from '../footer-view';
import HeaderView from '../header-view';
import {
  getRank,
  Filter,
  SortType,
  StatisticsPeriod,
} from '../model';
import Model from '../model/model';
import NavigationPanelView from '../navigation-panel-view';
import ChartView from './chart-view';
import FiltersView from './filters-view';
import GenresView from './genres-view';
import RankView from './rank-view';
import StatisticsView from './statistics-view';

export default class StatisticsScreen {
  constructor(model: Model) {
    this._model = model;

    const { watchedFilmsCount } = this._model.filmsSummary;
    const rank = getRank(watchedFilmsCount);

    this._headerView = new HeaderView(model);
    this._rankView = new RankView(rank);
    this._filtersView = new FiltersView(model);
    this._statisticsView = new StatisticsView(model);
    this._chartView = new ChartView(model);
    this._genresView = new GenresView(model);
    this._navigationPanelView = new NavigationPanelView({
      model: this._model,
      isFilmsScreen: false,
    });

    this._headerView.onMenuToggle = this._onMenuToggle.bind(this);
    this._headerView.onMainScreenOpen = this._onMainScreenOpen.bind(this);
    this._navigationPanelView.onFiltration = this._onFiltration.bind(this);
    this._filtersView.onPeriodChange = this._onPeriodChange.bind(this);
  }

  private _model: Model;
  private _headerView: HeaderView;
  private _navigationPanelView: NavigationPanelView;
  private _rankView: RankView;
  private _filtersView: FiltersView;
  private _statisticsView: StatisticsView;
  private _chartView: ChartView;
  private _genresView: GenresView;
  private _element: Element | null = null;

  public get element(): Element {
    if (this._element) {
      return this._element;
    }

    const sectionElement = document.createElement('section');
    sectionElement.classList.add('statistic');
    sectionElement.append(this._rankView.element);
    sectionElement.append(this._filtersView.element);
    sectionElement.append(this._statisticsView.element);
    sectionElement.append(this._chartView.element);
    sectionElement.append(this._genresView.element);

    const mainElement = document.createElement('main');
    mainElement.classList.add('main');
    mainElement.append(this._navigationPanelView.element);
    mainElement.append(sectionElement);

    this._element = document.createElement('div');
    this._element.append(this._headerView.element);
    this._element.append(mainElement);
    this._element.append(new FooterView(this._model).element);

    return this._element;
  }

  private _onMenuToggle(): void {
    this._navigationPanelView.toggleMenuVisibility();
  }

  private _onMainScreenOpen(): void {
    this._model.setFilter(Filter.All);
    this._model.setSortType(SortType.Default);
    this._openFilmsScreen();
  }

  private _onFiltration(selectedFilter: Filter): void {
    this._model.setFilter(selectedFilter);
    this._openFilmsScreen();
  }

  private _onPeriodChange(selectedPeriod: StatisticsPeriod): void {
    const { state } = this._model;
    if (state.period !== selectedPeriod) {
      this._model.setStatisticsPeriod(selectedPeriod);
      this._filtersView.updateActiveFilter();
      this._statisticsView.updateStatistics();
      this._chartView.updateChart();
      this._genresView.updateGenres();
    }
  }

  private _openFilmsScreen(): void {
    Application.showFilmsScreen(this._model.state);
    window.scrollTo(0, 0);
  }
}
