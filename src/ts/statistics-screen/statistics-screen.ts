import Application from '../application';
import FooterView from '../footer-view';
import HeaderView from '../header-view';
import {
  getRank,
  Filter,
  StatisticsPeriod,
} from '../model';
import Model from '../model/model';
import NavigationPanelView from '../navigation-panel-view';
import ChartView from './chart-view';
import FiltersView from './filters-view';
import RankView from './rank-view';
import StatisticsView from './statistics-view';

export default class StatisticsScreen {
  constructor(model: Model) {
    this._model = model;

    const { watchedFilmsCount } = this._model.filmsSummary;
    const rank = getRank(watchedFilmsCount);

    this._rankView = new RankView(rank);
    this._filtersView = new FiltersView(model);
    this._statisticsView = new StatisticsView(model);
    this._chartView = new ChartView(model);
    this._navigationPanelView = new NavigationPanelView({
      model: this._model,
      isFilmsScreen: false,
    });

    this._navigationPanelView.onFiltration = this._onFiltration.bind(this);
    this._filtersView.onPeriodChanged = this._onPeriodChanged.bind(this);
  }

  private _model: Model;
  private _navigationPanelView: NavigationPanelView;
  private _rankView: RankView;
  private _filtersView: FiltersView;
  private _statisticsView: StatisticsView;
  private _chartView: ChartView;
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

    const filmsCount = this._model.watchedFilmsInPeriod.length;
    if (filmsCount > 0) {
      sectionElement.append(this._chartView.element);
    }

    const mainElement = document.createElement('main');
    mainElement.classList.add('main');
    mainElement.append(this._navigationPanelView.element);
    mainElement.append(sectionElement);

    this._element = document.createElement('div');
    this._element.append(new HeaderView(this._model).element);
    this._element.append(mainElement);
    this._element.append(new FooterView(this._model).element);

    return this._element;
  }

  private _onFiltration(selectedFilter: Filter): void {
    this._model.setFilter(selectedFilter);
    Application.showFilmsScreen(this._model.state);
  }

  private _onPeriodChanged(selectedPeriod: StatisticsPeriod): void {
    const { state } = this._model;
    if (state.period !== selectedPeriod) {
      this._model.setStatisticsPeriod(selectedPeriod);
      this._statisticsView.updateStatistics();
      this._chartView.updateChart();
    }
  }
}
