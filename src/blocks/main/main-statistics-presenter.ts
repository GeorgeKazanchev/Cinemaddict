import Model from '../../ts/models/model';
import UserData from '../../ts/types/user-data';
import MainNavigationStatsPresenter from '../main-navigation/main-navigation-stats-presenter';
import StatisticsPresenter from '../statistics/statistics-presenter';
import MainStatisticsView from './main-statistics-view';

export default class MainStatisticsPresenter {
    constructor(model: Model, userData: UserData) {
        this.model = model;
        this.view = new MainStatisticsView(userData);

        this.mainNavigationPresenter = new MainNavigationStatsPresenter(model, userData);
        this.statisticsPresenter = new StatisticsPresenter(model, userData);
    }

    private model: Model;
    private view: MainStatisticsView;
    private mainNavigationPresenter: MainNavigationStatsPresenter;
    private statisticsPresenter: StatisticsPresenter;

    public render(element: Element): void {
        this.mainNavigationPresenter.render(this.view.element);
        this.statisticsPresenter.render(this.view.element);
        element.appendChild(this.view.element);
    }
}
