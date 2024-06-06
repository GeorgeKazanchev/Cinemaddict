import AbstractView from '../../types/abstract-view';
import FilmsSection from '../../types/films-sections/films-section';
import Movie from '../../types/movie';

export default class FilmsView extends AbstractView {
    constructor(filmsSection: FilmsSection) {
        super();
        this.filmsSection = filmsSection;
    }

    filmsSection: FilmsSection;
    template: string =
        `<section class="films"></section>`;

    get films(): Movie[] | null {
        return this.filmsSection.films;
    }

    getElement(): Element {
        const element = this.getTemplate();
        this.setFilmsLists(element);
        return element;
    }

    private setFilmsLists(element: Element): void {
        this.filmsSection.renderFilmsListsToElement(element);
    }
}
