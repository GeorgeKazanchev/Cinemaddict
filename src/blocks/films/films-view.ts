import AbstractView from '../../ts/abstract-view';
import FilmsListView from '../films-list/films-list-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import FilledFilmsSection from '../../ts/types/films-sections/filled-films-section';
import EmptyFilmsSection from '../../ts/types/films-sections/empty-films-section';
import Movie from '../../ts/types/movie';

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

    public createElement(): Element {
        const element = this.getTemplate();
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, element);
        return element;
    }

    public updateFilmsSection(films: Movie[] | null, allFilmsShown: boolean): void {
        this.filmsSection = films && films.length > 0
            ? new FilledFilmsSection(films, allFilmsShown)
            : new EmptyFilmsSection();
        this.filmsListViews = this.filmsSection.getFilmsListViews();
        this.element.innerHTML = '';
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, this.element);
    }
}
