import AbstractView from '../../types/abstract-view';
import FilmsView from '../films/films-view';
import SortView from '../sort/sort-view';
import FilmsSection from '../../types/films-sections/films-section';
import SortCriterionType from '../../types/sort-criterion-type';

//  TODO: The first prototype version. It will be updated
export default class MainView extends AbstractView {
    constructor(filmsSection: FilmsSection, selectedSortCriterion: SortCriterionType) {
        super();
        this.filmsSection = filmsSection;
        this.selectedSortCriterion = selectedSortCriterion;
    }

    filmsSection: FilmsSection;
    selectedSortCriterion: SortCriterionType;
    template: string =
        `<main class="main"></main>`;

    getElement(): Element {
        const element = this.getTemplate();
        const sortView = new SortView(this.selectedSortCriterion);
        const filmsView = new FilmsView(this.filmsSection);
        element.appendChild(sortView.getElement());
        element.appendChild(filmsView.getElement());
        return element;
    }
}
