import AbstractView from '../../ts/abstract-view';
import SortType from '../../ts/types/sort-type';
import DefaultSortCriterion from '../../ts/types/sort-criterions/default-sort-criterion';
import DateSortCriterion from '../../ts/types/sort-criterions/date-sort-criterion';
import RatingSortCriterion from '../../ts/types/sort-criterions/rating-sort-criterion';

export default class SortView extends AbstractView {
    constructor(sortSelected: SortType) {
        super();
        this.sortSelected = sortSelected;
    }

    sortSelected: SortType;
    template: string =
        `<ul class="sort"></ul>`;

    public get isVisible(): boolean {
        return this.element.isConnected;
    }

    public set isVisible(needToMakeVisible: boolean) {
        if (!needToMakeVisible) {
            this.element.remove();
            return;
        }

        if (this.element.isConnected) {
            return;
        }

        const mainNavElement = document.querySelector('.main-navigation');
        if (mainNavElement) {
            mainNavElement.insertAdjacentElement('afterend', this.element);
        } else {
            throw new Error('Sort panel can not be added to the page.');
        }
    }

    public createElement(): Element {
        const element = this.getTemplate();
        this.renderCriterionsToElement(element);
        return element;
    }

    public bind(): void {
        const sortButtons = this.element.querySelectorAll('.sort__button');
        sortButtons.forEach((button) => {
            button.addEventListener('click', (evt: Event) => this.buttonClickHandler(evt));
        });
    }

    public buttonClickHandler(_: Event) { }

    public updateSelectedSortCriterion(sortCriterion: SortType): void {
        this.sortSelected = sortCriterion;
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

        switch (this.sortSelected) {
            case SortType.Default: {
                defaultCriterion.active = true;
                break;
            }
            case SortType.Date: {
                dateCriterion.active = true;
                break;
            }
            case SortType.Rating: {
                ratingCriterion.active = true;
                break;
            }
        }

        element.appendChild(defaultCriterion.getElement());
        element.appendChild(dateCriterion.getElement());
        element.appendChild(ratingCriterion.getElement());
    }

    private checkSelectedCriterion(element: Element): void {
        const criterionSelector = this.getCriterionSelector(this.sortSelected);
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

    private getCriterionSelector(sortCriterion: SortType): string {
        switch (sortCriterion) {
            case SortType.Default: {
                return '.sort__button--default';
            }
            case SortType.Date: {
                return '.sort__button--date';
            }
            case SortType.Rating: {
                return '.sort__button--rating';
            }
            default: {
                throw new RangeError('Unsupported sort criterion type.');
            }
        }
    }
}
