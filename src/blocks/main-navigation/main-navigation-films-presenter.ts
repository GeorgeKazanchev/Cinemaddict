import Application from '../../ts/application';
import Model from '../../ts/models/model';
import MainNavigationFilmsView from './main-navigation-films-view';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';
import UserData from '../../ts/types/user-data';
import { getFiltrationCriterionByElement } from '../../ts/utils';

export default class MainNavigationFilmsPresenter {
    constructor(model: Model, selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData,
        filterFilms: (filtrationCriterion: FiltrationCriterionType) => void) {

        this.model = model;
        this.view = new MainNavigationFilmsView(selectedFiltrationCriterion, userData);

        this.filterFilms = filterFilms;

        this.setStatsButtonClickHandler();
        this.setFiltrationButtonsClickHandlers();
    }

    private model: Model;
    private view: MainNavigationFilmsView;
    private filterFilms: (filtrationCriterion: FiltrationCriterionType) => void;

    public render(element: Element): void {
        element.appendChild(this.view.element);
    }

    public updateHistoryTab(): void {
        this.view.updateHistory();
    }

    public updateWatchlistTab(): void {
        this.view.updateWatchlist();
    }

    public updateFavoritesTab(): void {
        this.view.updateFavorites();
    }

    public updateSelectedFiltrationCriterion(filtrationCriterion: FiltrationCriterionType): void {
        this.view.updateSelectedFiltrationCriterion(filtrationCriterion);
    }

    private setStatsButtonClickHandler(): void {
        const statsButton = this.view.element.querySelector('.main-navigation__additional');
        statsButton?.addEventListener('click', (evt: Event) => this.statsButtonClickHandler(evt));
    }

    private statsButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        Application.showStatistics(this.model.modelData);
    }

    private setFiltrationButtonsClickHandlers(): void {
        const filtrationButtons = this.view.element.querySelectorAll('.main-navigation__item');
        filtrationButtons.forEach((button) => {
            button.addEventListener('click', (evt: Event) => this.filtrationButtonClickHandler(evt));
        });
    }

    private filtrationButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        const button = evt.target;
        if (button instanceof Element) {
            const filtrationCriterion = getFiltrationCriterionByElement(button);
            this.filterFilms(filtrationCriterion);
        }
    }
}
