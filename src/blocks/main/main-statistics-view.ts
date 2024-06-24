import MainView from './main-view';
import MainNavigationStatsView from '../main-navigation/main-navigation-stats-view';
import StatisticsView from '../statistics/statistics-view';
import UserData from '../../ts/types/user-data';

export default class MainStatisticsView extends MainView {
    constructor(userData: UserData) {
        super(userData);

        this.mainNavigationView = new MainNavigationStatsView(this.userData);
        this.statisticsView = new StatisticsView(this.userData);
    }

    mainNavigationView: MainNavigationStatsView;
    statisticsView: StatisticsView;

    createElement(): Element {
        const element = this.getTemplate();
        element.appendChild(this.mainNavigationView.element);
        element.appendChild(this.statisticsView.element);
        return element;
    }

    updateStatisticsData(userData: UserData): void {
        this.statisticsView.userData = userData;
        this.statisticsView.updateWatchedFilms();
        this.statisticsView.updateTotalDuration();
        this.statisticsView.updateFavoriteGenres();
    }
}
