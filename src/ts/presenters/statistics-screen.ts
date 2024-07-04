import FooterView from '../../blocks/footer/footer-view';
import HeaderView from '../../blocks/header/header-view';
import MainStatisticsView from '../../blocks/main/main-statistics-view';
import ModelData from '../models-data/model-data';
import Model from '../models/model';
import Application from '../application';
import SortCriterionType from '../types/sort-criterion-type';
import { getFiltrationCriterionByElement, getMinDate } from '../utils';
import { STATS_SHOWN_GENRES_COUNT } from '../../settings';

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
        this.renderCanvas(getMinDate());
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
        const tab = evt.currentTarget;
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
            this.model.updateStatisticsData(startDate);
            this.mainView.updateStatisticsData(this.model.userData);
            this.renderCanvas(startDate);
        }
    }

    private renderCanvas(startDate: Date): void {
        const statisticsCanvas = this.mainView.element.querySelector('.statistic__chart');
        if (statisticsCanvas instanceof HTMLCanvasElement) {
            const context = statisticsCanvas.getContext('2d');
            if (context) {
                const genresDataArray = this.getShownGenresData(startDate);
                context.clearRect(0, 0, statisticsCanvas.width, statisticsCanvas.height);
                this.renderGenresColumns(context, genresDataArray, statisticsCanvas.width, statisticsCanvas.height);
            }
        }
    }

    private getShownGenresData(startDate: Date): [string, number][] {
        const genresDataMap = this.model.getGenresDataMap(this.model.getWatchedFilmsSince(startDate));
        const genresDataArray = Array.from(genresDataMap);
        genresDataArray.sort((a, b) => b[1] - a[1]);
        return genresDataArray.slice(0, STATS_SHOWN_GENRES_COUNT);
    }

    private renderGenresColumns(context: CanvasRenderingContext2D, genresDataArray: [string, number][],
        canvasWidth: number, canvasHeight: number): void {

        if (genresDataArray.length === 0) {     //  If the array is empty we don't render any columns
            return;
        }

        const columnWidth = 50;
        const columnGap = 2 * columnWidth;
        const largestColumnHeight = 0.7 * canvasHeight;
        const columnsCount = genresDataArray.length;

        const x0 = (canvasWidth - columnsCount * columnWidth - (columnsCount - 1) * columnGap) / 2;
        const y0 = 60;  //  Bottom margin of the columns

        const topGenreFilmsCount = genresDataArray[0][1];

        for (let i = 0; i < genresDataArray.length; ++i) {
            const genre = genresDataArray[i][0];
            const filmsCount = genresDataArray[i][1];
            const columnHeight = largestColumnHeight * filmsCount / topGenreFilmsCount;

            const x = x0 + i * (columnWidth + columnGap);
            const y = canvasHeight - y0 - columnHeight;
            const genreY = y + columnHeight + 30;
            const filmsCountY = y + columnHeight + 60;

            this.renderColumn(context, x, y, columnWidth, columnHeight);
            this.renderGenreName(context, genre, x + columnWidth / 2, genreY);
            this.renderFilmsCount(context, filmsCount, x + columnWidth / 2, filmsCountY);
        }
    }

    private renderColumn(context: CanvasRenderingContext2D, x: number, y: number,
        width: number, height: number): void {

        const gradient = context.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, '#e49a27');
        gradient.addColorStop(1, '#ffe800');
        context.fillStyle = gradient;
        context.fillRect(x, y, width, height);
    }

    private renderGenreName(context: CanvasRenderingContext2D, genre: string,
        x: number, y: number): void {

        context.fillStyle = '#ffffff';
        context.font = '24px "Open Sans", "Arial", sans-serif';
        context.textAlign = 'center';
        context.fillText(genre, x, y);
    }

    private renderFilmsCount(context: CanvasRenderingContext2D, filmsCount: number,
        x: number, y: number): void {

        context.fillStyle = '#ffe800';
        context.font = 'bold 24px "Open Sans", "Arial", sans-serif';
        context.textAlign = 'center';
        context.fillText(filmsCount.toFixed(0), x, y);
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
