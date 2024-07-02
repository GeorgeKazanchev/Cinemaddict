import Model from '../../ts/models/model';
import UserData from '../../ts/types/user-data';
import MainNavigationStatsView from './main-navigation-stats-view';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import Application from '../../ts/application';
import { getFiltrationCriterionByElement } from '../../ts/utils';

export default class MainNavigationStatsPresenter {
    constructor(model: Model, userData: UserData) {
        this.model = model;
        this.view = new MainNavigationStatsView(userData);

        this.setNavigationTabsClickHandlers();
    }

    private model: Model;
    private view: MainNavigationStatsView;

    public render(element: Element): void {
        element.appendChild(this.view.element);
    }

    private setNavigationTabsClickHandlers(): void {
        const navigationTabs = this.view.element.querySelectorAll('.main-navigation__item');
        navigationTabs.forEach((navigationTab) => {
            navigationTab.addEventListener('click', (evt: Event) => this.navigationTabClickHandler(evt));
        });
    }

    private navigationTabClickHandler(evt: Event): void {
        evt.preventDefault();
        const tab = evt.target;
        if (tab instanceof Element) {
            const filtrationCriterion = getFiltrationCriterionByElement(tab);
            this.model.selectedFiltrationCriterion = filtrationCriterion;
            this.model.selectedSortCriterion = SortCriterionType.Default;
            Application.showFilmsScreen(this.model.modelData);
        }
    }
}
