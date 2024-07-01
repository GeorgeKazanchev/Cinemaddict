import Model from '../../ts/models/model';
import UserData from '../../ts/types/user-data';
import StatisticsView from './statistics-view';

export default class StatisticsPresenter {
    constructor(model: Model, userData: UserData) {
        this.model = model;
        this.view = new StatisticsView(userData);
    }

    private model: Model;
    private view: StatisticsView;

    public render(element: Element): void {
        element.appendChild(this.view.element);
    }
}
