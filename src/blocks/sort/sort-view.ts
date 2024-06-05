import AbstractView from '../../types/abstract-view';
import SortCriterion from '../../types/sort-criterion';

export default class SortView extends AbstractView {
    constructor(activeSortCriterion: SortCriterion) {
        super();
        this.activeSortCriterion = activeSortCriterion;
    }

    activeSortCriterion: SortCriterion;
    template: string =
        `<ul class="sort"></ul>`;

    static get ACTIVE_CRITERION_CLASSNAME(): string { return 'sort__button--active'; };

    getElement(): Element {
        const element = this.getTemplate();
        this.setActiveCriterion(element);
        return element;
    }

    private setActiveCriterion(element: Element): void {
        const defaultCriterionElement = this.getCriterionElement(SortCriterion.Default);
        const dateCriterionElement = this.getCriterionElement(SortCriterion.Date);
        const ratingCriterionElement = this.getCriterionElement(SortCriterion.Rating);

        //  TODO: That must be simplified
        switch (this.activeSortCriterion) {
            case SortCriterion.Default: {
                const innerElement = defaultCriterionElement.querySelector('.sort__button');
                if (innerElement) innerElement.classList.add(SortView.ACTIVE_CRITERION_CLASSNAME);
                break;
            }
            case SortCriterion.Date: {
                const innerElement = dateCriterionElement.querySelector('.sort__button');
                if (innerElement) innerElement.classList.add(SortView.ACTIVE_CRITERION_CLASSNAME);
                break;
            }
            case SortCriterion.Rating: {
                const innerElement = ratingCriterionElement.querySelector('.sort__button');
                if (innerElement) innerElement.classList.add(SortView.ACTIVE_CRITERION_CLASSNAME);
                break;
            }
        }

        element.appendChild(defaultCriterionElement);
        element.appendChild(dateCriterionElement);
        element.appendChild(ratingCriterionElement);
    }

    private getCriterionElement(criterion: SortCriterion) {
        const element = document.createElement('li');
        const innerElement = document.createElement('a');
        innerElement.href = '#';
        innerElement.classList.add('sort__button');
        innerElement.textContent = criterion;
        element.appendChild(innerElement);
        return element;
    }
}
