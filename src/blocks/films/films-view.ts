import AbstractView from '../../ts/abstract-view';
import FilmsListView from '../films-list/films-list-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import FilledFilmsSection from '../../ts/types/films-sections/filled-films-section';
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

    createElement(): Element {
        const element = this.getTemplate();
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, element);
        return element;
    }

    updateFilmsSection(films: Movie[] | null, allFilmsShown: boolean): void {
        this.filmsSection = new FilledFilmsSection(films, allFilmsShown);
        this.filmsListViews = this.filmsSection.getFilmsListViews();
        this.element.innerHTML = '';
        this.filmsSection.renderFilmsListsToElement(this.filmsListViews, this.element);
    }

    updateAllMoviesFilmsList(shownFilms: Movie[]): void {
        const filmsListView = this.filmsListViews[0];     //  TODO: Don't use index here
        filmsListView.filmsList.films = shownFilms;
        filmsListView.setFilmCardViews();

        const filmsListContainer = filmsListView.element.querySelector('.films-list__container');
        if (filmsListContainer) {
            filmsListContainer.innerHTML = '';
            filmsListView.filmCardViews.forEach((filmCardView) => {
                filmsListContainer.append(filmCardView.element);
            })
        }
    }

    hideShowMoreButton(): void {
        const showMoreButton = this.element.querySelector('.films-list__show-more');
        showMoreButton?.remove();
    }
}
