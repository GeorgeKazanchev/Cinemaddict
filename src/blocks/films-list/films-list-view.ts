import AbstractView from '../../ts/abstract-view';
import FilmCardView from '../film-card/film-card-view';
import FilmsList from '../../ts/types/films-lists/films-list';
import AllMoviesFilmsList from '../../ts/types/films-lists/all-movies-films-list';
import Movie from '../../ts/types/movie';

export default class FilmsListView extends AbstractView {
    constructor(filmsList: FilmsList) {
        super();
        this.filmsList = filmsList;
        this.filmCardViews = this.getFilmCardViews();
    }

    filmsList: FilmsList;
    filmCardViews: FilmCardView[];
    template: string =
        `<section class="films-list">
            <h2 class="films-list__title"></h2>
        </section>`;

    get films(): Movie[] | null {
        return this.filmsList.films;
    }

    createElement(): Element {
        const element = this.getTemplate();
        this.setModifier(element);
        this.setTitle(element);
        this.setFilmsListContainer(element);
        this.setShowMoreButton(element);
        return element;
    }

    setFilmCardViews(): void {
        this.filmCardViews = this.getFilmCardViews();
    }

    getFilmCardViews(): FilmCardView[] {
        return this.filmsList.films?.map((film) => new FilmCardView(film)) ?? [];
    }

    hideShowMoreButton(): void {
        const showMoreButton = this.element.querySelector('.films-list__show-more');
        showMoreButton?.remove();
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

            this.filmCardViews.forEach((filmCardView) => {
                container.appendChild(filmCardView.element);
            });

            element.appendChild(container);
        }
    }

    private setShowMoreButton(element: Element): void {
        const needToRender = this.checkShouldShowMoreButtonRendered();
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

    private checkShouldShowMoreButtonRendered(): boolean {
        if (this.filmsList instanceof AllMoviesFilmsList
            && !this.filmsList.allFilmsShown) {

            return true;
        }
        return false;
    }
}
