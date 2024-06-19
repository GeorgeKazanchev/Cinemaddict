import MainView from './main-view';
import MainNavigationView from '../main-navigation/main-navigation-view';
import StatisticsView from '../statistics/statistics-view';
import UserData from '../../ts/types/user-data';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';

export default class MainStatisticsView extends MainView {
    constructor(selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData) {
        super(selectedFiltrationCriterion, userData);
    }

    createElement(): Element {
        const element = this.getTemplate();

        const mainNavigationView = new MainNavigationView(this.selectedFiltrationCriterion, this.userData);
        element.appendChild(mainNavigationView.element);

        const statisticsView = new StatisticsView(this.userData);
        element.appendChild(statisticsView.element);
        return element;
    }
}
