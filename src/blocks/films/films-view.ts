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

    createElement(): Element {
        const element = this.getTemplate();
        return element;
    }

    hideShowMoreButton(): void {
        const showMoreButton = this.element.querySelector('.films-list__show-more');
        showMoreButton?.remove();
    }
}
