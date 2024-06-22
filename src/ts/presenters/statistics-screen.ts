import FooterView from '../../blocks/footer/footer-view';
import HeaderView from '../../blocks/header/header-view';
import MainStatisticsView from '../../blocks/main/main-statistics-view';
import ModelData from '../models-data/model-data';
import Model from '../models/model';
import FilmsScreen from './films-screen';
import { getFiltrationCriterionByElement } from '../utils';

export default class StatisticsScreen {
    constructor(data: ModelData) {
        this.model = new Model(data);

        this.headerView = new HeaderView(this.model.isAuthorized, this.model.userData);
        this.mainView = new MainStatisticsView(this.model.userData);
        this.footerView = new FooterView(this.model.filmsCount);

        this.setNavigationTabsClickHandlers();
    }

    private model: Model;
    private headerView: HeaderView;
    private mainView: MainStatisticsView;
    private footerView: FooterView;
    private isRendered: boolean = false;

    public render(): void {
        if (!this.isRendered) {
            document.body.insertAdjacentElement('afterbegin', this.headerView.element);
            this.headerView.element.insertAdjacentElement('afterend', this.mainView.element);
            this.mainView.element.insertAdjacentElement('afterend', this.footerView.element);
        }
    }

    private setNavigationTabsClickHandlers(): void {
        const navigationTabs = this.mainView.element.querySelectorAll('.main-navigation__item');
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

            const filmsScreen = new FilmsScreen(this.model.modelData);
            document.body.innerHTML = '';
            filmsScreen.render();
        }
    }
}
