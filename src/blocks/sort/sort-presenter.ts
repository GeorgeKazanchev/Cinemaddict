import Model from '../../ts/models/model';
import SortView from './sort-view';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import Movie from '../../ts/types/movie';
import { getSortCriterionByElement } from '../../ts/utils';

export default class SortPresenter {
    constructor(model: Model, selectedSortCriterion: SortCriterionType,
        updateFilmsSection: (shownFilms: Movie[], allFilmsShown: boolean) => void) {

        this.model = model;
        this.view = new SortView(selectedSortCriterion);

        this.updateFilmsSection = updateFilmsSection;

        this.setSortButtonsClickHandlers();
    }

    private model: Model;
    private view: SortView;
    private updateFilmsSection: (shownFilms: Movie[], allFilmsShown: boolean) => void;

    private setSortButtonsClickHandlers(): void {
        const sortButtons = this.view.element.querySelectorAll('.sort__button');
        sortButtons.forEach((button) => {
            button.addEventListener('click', (evt: Event) => this.sortButtonClickHandler(evt));
        });
    }

    private sortButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        const button = evt.target;
        if (button instanceof Element) {
            const sortCriterion = getSortCriterionByElement(button);
            this.sortFilms(sortCriterion);
        }
    }

    private sortFilms(sortCriterion: SortCriterionType): void {
        this.model.selectedSortCriterion = sortCriterion;
        this.model.resetShownFilmsCount();
        this.view.updateSelectedSortCriterion(sortCriterion);
        this.updateFilmsSection(this.model.shownFilms, this.model.allFilmsShown);
    }
}
