import Model from '../../ts/models/model';
import UserData from '../../ts/types/user-data';
import MainNavigationStatsView from './main-navigation-stats-view';

export default class MainNavigationStatsPresenter {
    constructor(model: Model, userData: UserData) {
        this.model = model;
        this.view = new MainNavigationStatsView(userData);
    }

    private model: Model;
    private view: MainNavigationStatsView;

    public render(element: Element): void {
        element.appendChild(this.view.element);
    }
}
