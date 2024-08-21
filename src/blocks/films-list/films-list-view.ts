import AbstractView from '../../ts/abstract-view';
import FilmCardView from '../film-card/film-card-view';
import FilmsList from '../../ts/types/films-lists/films-list';
import AllMoviesFilmsList from '../../ts/types/films-lists/all-movies-films-list';
import Movie from '../../ts/types/movie';
import { FilmCardsHandlers } from '../../ts/types/handlers';

export default class FilmsListView extends AbstractView {
    constructor(filmsList: FilmsList, filmCardsHandlers: FilmCardsHandlers) {
        super();
        this.filmsList = filmsList;
        this.handlers = filmCardsHandlers;
        this.filmCardViews = this.getFilmCardViews();
        this.showMoreButtonClickHandler = filmCardsHandlers.showMoreButtonClickHandler;
    }

    filmsList: FilmsList;
    filmCardViews: FilmCardView[];
    handlers: FilmCardsHandlers;

    public get template(): string {
        return `<section class="films-list">
                    <h2 class="films-list__title${this.filmsList.isTitleHidden ? ' visually-hidden' : ''}">
                        ${this.filmsList.title}
                    </h2>
                </section>`;
    }

    public get films(): Movie[] | null {
        return this.filmsList.films;
    }

    public createElement(): Element {
        const element = this.getTemplate();
        this.setModifier(element);
        this.setFilmsListContainer(element);
        this.setShowMoreButton(element);
        return element;
    }

    public bind(): void {
        const showMoreButton = this.element.querySelector('.films-list__show-more');
        showMoreButton?.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.showMoreButtonClickHandler(evt);
        })
    }

    public showMoreButtonClickHandler(_: Event): void { }

    public setFilmCardViews(): void {
        this.filmCardViews = this.getFilmCardViews();
    }

    public getFilmCardViews(): FilmCardView[] {
        const filmCardViews = this.filmsList.films?.map((film) => new FilmCardView(film)) ?? [];
        filmCardViews.forEach((view) => {
            view.markWatchedButtonClickHandler = this.handlers.markWatchedButtonClickHandler;
            view.watchlistButtonClickHandler = this.handlers.watchlistButtonClickHandler;
            view.favoritesButtonClickHandler = this.handlers.favoritesButtonClickHandler;
            view.popupOpenClickHandler = this.handlers.popupOpenClickHandler;
        });
        return filmCardViews;
    }

    private setModifier(element: Element): void {
        if (this.filmsList.isExtra) {
            element.classList.add('films-list--extra');
        }
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
