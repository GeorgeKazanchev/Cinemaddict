import AbstractView from '../../ts/abstract-view';
import FilmsListView from '../films-list/films-list-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import { FilmCardsHandlers } from '../../ts/types/handlers';

export default class FilmsView extends AbstractView {
    constructor(filmsSection: FilmsSection, filmCardsHandlers: FilmCardsHandlers) {
        super();
        this.filmsSection = filmsSection;
        this.filmCardsHandlers = filmCardsHandlers;
        this.filmsListViews = filmsSection.getFilmsListViews(filmCardsHandlers);
    }

    filmsSection: FilmsSection;
    filmsListViews: FilmsListView[];
    filmCardsHandlers: FilmCardsHandlers;
    template: string =
        `<section class="films"></section>`;

    public createElement(): Element {
        const element = this.getTemplate();
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, element);
        return element;
    }

    public updateFilmsSection(filmsSection: FilmsSection): void {
        this.filmsSection = filmsSection;
        this.filmsListViews = this.filmsSection.getFilmsListViews(this.filmCardsHandlers);
        this.element.innerHTML = '';
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, this.element);
    }
}
