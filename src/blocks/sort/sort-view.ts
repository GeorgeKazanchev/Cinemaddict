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

    public createElement(): Element {
        const element = this.getTemplate();
        this.renderCriterionsToElement(element);
        return element;
    }

    public updateSelectedSortCriterion(sortCriterion: SortCriterionType): void {
        this.selectedSortCriterion = sortCriterion;
        this.uncheckAllCriterions(this.element);
        this.checkSelectedCriterion(this.element);
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

    private checkSelectedCriterion(element: Element): void {
        const criterionSelector = this.getCriterionSelector(this.selectedSortCriterion);
        const selectedCriterion = element.querySelector(criterionSelector);
        if (selectedCriterion) {
            selectedCriterion.classList.add('sort__button--active');
        }
    }

    private uncheckAllCriterions(element: Element): void {
        const sortCriterions = element.querySelectorAll('.sort__button');
        sortCriterions.forEach((criterion) => {
            criterion.classList.remove('sort__button--active');
        })
    }

    private getCriterionSelector(sortCriterion: SortCriterionType): string {
        switch (sortCriterion) {
            case SortCriterionType.Default: {
                return '.sort__button--default';
            }
            case SortCriterionType.Date: {
                return '.sort__button--date';
            }
            case SortCriterionType.Rating: {
                return '.sort__button--rating';
            }
            default: {
                throw new RangeError('Unsupported sort criterion type.');
            }
        }
    }
}
