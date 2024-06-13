import AbstractView from '../../ts/abstract-view';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import DefaultSortCriterion from '../../ts/types/sort-criterions/default-sort-criterion';
import DateSortCriterion from '../../ts/types/sort-criterions/date-sort-criterion';
import RatingSortCriterion from '../../ts/types/sort-criterions/rating-sort-criterion';

export default class SortView extends AbstractView {
    constructor(selectedSortCriterion: SortCriterionType) {
        super();
        this.selectedSortCriterion = selectedSortCriterion;
    }

    selectedSortCriterion: SortCriterionType;
    template: string =
        `<ul class="sort"></ul>`;

    getElement(): Element {
        const element = this.getTemplate();
        this.renderCriterionsToElement(element);
        return element;
    }

    private renderCriterionsToElement(element: Element) {
        const defaultCriterion = new DefaultSortCriterion();
        const dateCriterion = new DateSortCriterion();
        const ratingCriterion = new RatingSortCriterion();

        defaultCriterion.createElement();
        dateCriterion.createElement();
        ratingCriterion.createElement();

        switch (this.selectedSortCriterion) {
            case SortCriterionType.Default: {
                defaultCriterion.active = true;
                break;
            }
            case SortCriterionType.Date: {
                dateCriterion.active = true;
                break;
            }
            case SortCriterionType.Rating: {
                ratingCriterion.active = true;
                break;
            }
        }

        element.appendChild(defaultCriterion.getElement());
        element.appendChild(dateCriterion.getElement());
        element.appendChild(ratingCriterion.getElement());
    }
}
