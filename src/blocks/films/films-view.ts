import AbstractView from '../../ts/abstract-view';
import FilmsSection from '../../ts/types/films-sections/films-section';

export default class FilmsView extends AbstractView {
    constructor(filmsSection: FilmsSection) {
        super();
        this.filmsSection = filmsSection;
    }

    filmsSection: FilmsSection;
    template: string =
        `<section class="films"></section>`;

    getElement(): Element {
        const element = this.getTemplate();
        this.setFilmsLists(element);
        return element;
    }

    private setFilmsLists(element: Element): void {
        this.filmsSection.renderFilmsListsToElement(element);
    }
}
