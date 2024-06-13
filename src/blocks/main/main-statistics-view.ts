import MainView from './main-view';
import MainNavigationView from '../main-navigation/main-navigation-view';
import StatisticsView from '../statistics/statistics-view';
import Model from '../../ts/models/model';

export default class MainStatisticsView extends MainView {
    constructor(model: Model) {
        super(model);
    }

    createElement(): Element {
        const element = this.getTemplate();

        const mainNavigationView = new MainNavigationView(this.model.selectedNavigationItem, this.model.userData);
        element.appendChild(mainNavigationView.element);

        const statisticsView = new StatisticsView(this.model.userData);
        element.appendChild(statisticsView.element);
        return element;
    }
}
