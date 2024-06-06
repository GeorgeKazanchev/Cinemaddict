import AbstractView from '../../types/abstract-view';
import FilmCardView from '../film-card/film-card-view';
import FilmsList from '../../types/films-lists/films-list';
import AllMoviesFilmsList from '../../types/films-lists/all-movies-films-list';
import Movie from '../../types/movie';

export default class FilmsListView extends AbstractView {
    constructor(filmsList: FilmsList) {
        super();
        this.filmsList = filmsList;
    }

    filmsList: FilmsList;
    template: string =
        `<section class="films-list">
            <h2 class="films-list__title"></h2>
        </section>`;

    get films(): Movie[] | null {
        return this.filmsList.films;
    }

    getElement(): Element {
        const element = this.getTemplate();
        this.setModifier(element);
        this.setTitle(element);
        this.setFilmsListContainer(element);
        this.setShowMoreButton(element);
        return element;
    }

    private setModifier(element: Element): void {
        if (this.filmsList.isExtra) {
            element.classList.add('films-list--extra');
        }
    }

    private setTitle(element: Element): void {
        this.filmsList.setTitle(element);
    }

    private setFilmsListContainer(element: Element): void {
        const needToRender = this.checkShouldFilmsRendered();
        if (needToRender) {
            const container = document.createElement('div');
            container.classList.add('films-list__container');

            this.films?.forEach((film) => {
                const filmCardView = new FilmCardView(film);
                container.appendChild(filmCardView.getElement());
            });

            element.appendChild(container);
        }
    }

    private setShowMoreButton(element: Element): void {
        const needToRender = this.checkShouldFilmsRendered() && this.filmsList instanceof AllMoviesFilmsList;
        if (needToRender) {
            const button = document.createElement('button');
            button.classList.add('films-list__show-more');
            button.textContent = 'Show more';
            element.appendChild(button);
        }
    }

    private checkShouldFilmsRendered(): boolean {
        return !this.filmsList.isEmpty;
    }
}
