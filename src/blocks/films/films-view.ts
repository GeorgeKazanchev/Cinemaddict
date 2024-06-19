import AbstractView from '../../ts/abstract-view';
import FilmsListView from '../films-list/films-list-view';
import FilmsSection from '../../ts/types/films-sections/films-section';

export default class FilmsView extends AbstractView {
    constructor(filmsSection: FilmsSection) {
        super();
        this.filmsSection = filmsSection;
        this.filmsListViews = filmsSection.getFilmsListViews();
    }

    filmsSection: FilmsSection;
    filmsListViews: FilmsListView[];
    template: string =
        `<section class="films"></section>`;

    createElement(): Element {
        const element = this.getTemplate();
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, element);
        return element;
    }

    updateFilmsSection(filmsSection: FilmsSection): void {
        this.filmsSection = filmsSection;
        this.filmsListViews = filmsSection.getFilmsListViews();
        this.element.innerHTML = '';
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, this.element);
    }
}
