import MainView from './main-view';
import MainNavigationStatsView from '../main-navigation/main-navigation-stats-view';
import StatisticsView from '../statistics/statistics-view';
import UserData from '../../ts/types/user-data';
import { StatisticsData } from '../../ts/types/statistics-data';

export default class MainStatisticsView extends MainView {
    constructor(userData: UserData, statisticsData: StatisticsData) {
        super(userData);

        this.mainNavigationView = new MainNavigationStatsView(this.userData);
        this.statisticsView = new StatisticsView(this.userData, statisticsData);
    }

    mainNavigationView: MainNavigationStatsView;
    statisticsView: StatisticsView;

    public createElement(): Element {
        const element = this.getTemplate();
        element.appendChild(this.mainNavigationView.element);
        element.appendChild(this.statisticsView.element);
        return element;
    }

    public updateStatisticsData(userData: UserData, statisticsData: StatisticsData): void {
        this.statisticsView.userData = userData;
        this.statisticsView.statisticsData = statisticsData;
        this.statisticsView.updateWatchedFilms();
        this.statisticsView.updateTotalDuration();
        this.statisticsView.updateFavoriteGenres();
    }
}
