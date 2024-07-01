import Model from '../../ts/models/model';
import SortView from './sort-view';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import { getSortCriterionByElement } from '../../ts/utils';

export default class SortPresenter {
    constructor(model: Model, selectedSortCriterion: SortCriterionType,
        sortFilms: (sortCriterion: SortCriterionType) => void) {

        this.model = model;
        this.view = new SortView(selectedSortCriterion);

        this.sortFilms = sortFilms;

        this.setSortButtonsClickHandlers();
    }

    private model: Model;
    private view: SortView;
    private sortFilms: (sortCriterion: SortCriterionType) => void;

    public render(element: Element): void {
        element.appendChild(this.view.element);
    }

    public updateSelectedSortCriterion(sortCriterion: SortCriterionType): void {
        this.view.updateSelectedSortCriterion(sortCriterion);
    }

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
}
