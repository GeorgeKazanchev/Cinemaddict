import MainView from './main-view';
import MainNavigationView from '../main-navigation/main-navigation-view';
import StatisticsView from '../statistics/statistics-view';
import NavigationItem from '../../ts/types/navigation-items/navigation-item';
import UserData from '../../ts/types/user-data';

export default class MainStatisticsView extends MainView {
    constructor(selectedNavigationItem: NavigationItem, userData: UserData) {
        super(selectedNavigationItem, userData);
    }

    createElement(): Element {
        const element = this.getTemplate();

        const mainNavigationView = new MainNavigationView(this.selectedNavigationItem, this.userData);
        element.appendChild(mainNavigationView.element);

        const statisticsView = new StatisticsView(this.userData);
        element.appendChild(statisticsView.element);
        return element;
    }
}
