import MainView from './main-view';
import MainNavigationStatsView from '../main-navigation/main-navigation-stats-view';
import StatisticsView from '../statistics/statistics-view';
import UserData from '../../ts/types/user-data';

export default class MainStatisticsView extends MainView {
    constructor(userData: UserData) {
        super(userData);
    }

    createElement(): Element {
        const element = this.getTemplate();

        const mainNavigationView = new MainNavigationStatsView(this.userData);
        element.appendChild(mainNavigationView.element);

        const statisticsView = new StatisticsView(this.userData);
        element.appendChild(statisticsView.element);
        return element;
    }
}
