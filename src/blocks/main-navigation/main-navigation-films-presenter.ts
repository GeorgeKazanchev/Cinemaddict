import Application from '../../ts/application';
import Model from '../../ts/models/model';
import MainNavigationFilmsView from './main-navigation-films-view';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';
import UserData from '../../ts/types/user-data';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import Movie from '../../ts/types/movie';
import { getFiltrationCriterionByElement } from '../../ts/utils';

export default class MainNavigationFilmsPresenter {
    constructor(model: Model, selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData,
        updateSelectedSortCriterion: (sortCriterion: SortCriterionType) => void,
        updateFilmsSection: (shownFilms: Movie[], allFilmsShown: boolean) => void) {

        this.model = model;
        this.view = new MainNavigationFilmsView(selectedFiltrationCriterion, userData);

        this.updateSelectedSortCriterion = updateSelectedSortCriterion;
        this.updateFilmsSection = updateFilmsSection;

        this.setStatsButtonClickHandler();
        this.setFiltrationButtonsClickHandlers();
    }

    private model: Model;
    private view: MainNavigationFilmsView;
    private updateSelectedSortCriterion: (sortCriterion: SortCriterionType) => void;
    private updateFilmsSection: (shownFilms: Movie[], allFilmsShown: boolean) => void;

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

    private filterFilms(filtrationCriterion: FiltrationCriterionType): void {
        this.model.selectedFiltrationCriterion = filtrationCriterion;
        this.model.selectedSortCriterion = SortCriterionType.Default;
        this.model.resetShownFilmsCount();
        this.view.updateSelectedFiltrationCriterion(filtrationCriterion);
        this.updateSelectedSortCriterion(SortCriterionType.Default);
        this.updateFilmsSection(this.model.shownFilms, this.model.allFilmsShown);
    }
}
