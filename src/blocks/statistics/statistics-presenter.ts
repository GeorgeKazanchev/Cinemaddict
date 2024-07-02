import Model from '../../ts/models/model';
import UserData from '../../ts/types/user-data';
import StatisticsView from './statistics-view';
import { getMinDate } from '../../ts/utils';

export default class StatisticsPresenter {
    constructor(model: Model, userData: UserData) {
        this.model = model;
        this.view = new StatisticsView(userData);

        this.setStatisticsFiltersChangeHandlers();
    }

    private model: Model;
    private view: StatisticsView;

    public render(element: Element): void {
        element.appendChild(this.view.element);
    }

    public updateStatisticsData(userData: UserData): void {
        this.view.userData = userData;
        this.view.updateWatchedFilms();
        this.view.updateTotalDuration();
        this.view.updateFavoriteGenres();
    }

    private setStatisticsFiltersChangeHandlers(): void {
        const filters = this.view.element.querySelectorAll('.statistic__filters-input');
        filters.forEach((filter) => {
            filter.addEventListener('change', (evt: Event) => this.statisticsFilterChangeHandler(evt));
        });
    }

    private statisticsFilterChangeHandler(evt: Event): void {
        evt.preventDefault();
        const filter = evt.target;
        if (filter instanceof HTMLInputElement) {
            const startDate = this.getStartDateByFilterValue(filter.value);
            console.log(startDate);
            this.model.updateStatisticsData(startDate);
            this.updateStatisticsData(this.model.userData);
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
