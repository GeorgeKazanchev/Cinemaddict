import AbstractView from '../../ts/abstract-view';
import FilmsListView from '../films-list/films-list-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import { FilmCardHandlers } from '../../ts/types/film-card-handlers';

export default class FilmsView extends AbstractView {
    constructor(filmsSection: FilmsSection, filmCardHandlers: FilmCardHandlers) {
        super();
        this.filmsSection = filmsSection;
        this.filmCardHandlers = filmCardHandlers;
        this.filmsListViews = filmsSection.getFilmsListViews(filmCardHandlers);
    }

    filmsSection: FilmsSection;
    filmsListViews: FilmsListView[];
    filmCardHandlers: FilmCardHandlers;
    template: string =
        `<section class="films"></section>`;

    public createElement(): Element {
        const element = this.getTemplate();
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, element);
        return element;
    }

    public updateFilmsSection(filmsSection: FilmsSection): void {
        this.filmsSection = filmsSection;
        this.filmsListViews = this.filmsSection.getFilmsListViews(this.filmCardHandlers);
        this.element.innerHTML = '';
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, this.element);
    }
}
