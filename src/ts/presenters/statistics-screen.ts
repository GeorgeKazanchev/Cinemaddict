import FooterView from '../../blocks/footer/footer-view';
import HeaderView from '../../blocks/header/header-view';
import MainStatisticsView from '../../blocks/main/main-statistics-view';
import ModelData from '../models-data/model-data';
import Model from '../models/model';
import Application from '../application';
import SortCriterionType from '../types/sort-criterion-type';
import { getFiltrationCriterionByElement, getMinDate } from '../utils';

export default class StatisticsScreen {
    constructor(data: ModelData) {
        this.model = new Model(data);
        this.model.updateUserData();
        this.model.updateStatisticsData(getMinDate());

        this.headerView = new HeaderView(this.model.isAuthorized, this.model.userData);
        this.mainView = new MainStatisticsView(this.model.userData);
        this.footerView = new FooterView(this.model.allFilmsCount);

        this.setNavigationTabsClickHandlers();
        this.setStatisticsFiltersChangeHandlers();
    }

    private model: Model;
    private headerView: HeaderView;
    private mainView: MainStatisticsView;
    private footerView: FooterView;

    public render(): void {
        document.body.innerHTML = '';
        document.body.insertAdjacentElement('afterbegin', this.headerView.element);
        this.headerView.element.insertAdjacentElement('afterend', this.mainView.element);
        this.mainView.element.insertAdjacentElement('afterend', this.footerView.element);
    }

    private setNavigationTabsClickHandlers(): void {
        const navigationTabs = this.mainView.element.querySelectorAll('.main-navigation__item');
        navigationTabs.forEach((navigationTab) => {
            navigationTab.addEventListener('click', (evt: Event) => this.navigationTabClickHandler(evt));
        });
    }

    private setStatisticsFiltersChangeHandlers(): void {
        const filters = this.mainView.element.querySelectorAll('.statistic__filters-input');
        filters.forEach((filter) => {
            filter.addEventListener('change', (evt: Event) => this.statisticsFilterChangeHandler(evt));
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

    private statisticsFilterChangeHandler(evt: Event): void {
        evt.preventDefault();
        const filter = evt.target;
        if (filter instanceof HTMLInputElement) {
            const startDate = this.getStartDateByFilterValue(filter.value);
            console.log(startDate);
            this.model.updateStatisticsData(startDate);
            this.mainView.updateStatisticsData(this.model.userData);
        }
    }

    private getStartDateByFilterValue(value: string): Date {
        let startDate = new Date();

        switch (value) {
            case 'all-time': {
                startDate = getMinDate();
                break;
            }
            case 'year': {
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            }
            case 'month': {
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            }
            case 'week': {
                startDate.setDate(startDate.getDate() - 7);
                break;
            }
            case 'today': {
                startDate.setDate(startDate.getDate() - 1);
                break;
            }
            default: {
                throw new RangeError('Input value is not supported.');
            }
        }

        return startDate;
    }
}
