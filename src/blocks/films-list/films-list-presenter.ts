import Model from '../../ts/models/model';
import FilmsList from '../../ts/types/films-lists/films-list';
import Movie from '../../ts/types/movie';
import FilmCardPresenter from '../film-card/film-card-presenter';
import FilmsListView from './films-list-view';

export default class FilmsListPresenter {
    constructor(model: Model, filmsList: FilmsList,
        updateUserRating: () => void, updateHistoryTab: () => void,
        updateWatchlistTab: () => void, updateFavoritesTab: () => void) {

        this.model = model;
        this.view = new FilmsListView(filmsList);
        this.filmCardPresenters = this.getFilmCardPresentersBy(filmsList.films,
            updateUserRating, updateHistoryTab, updateWatchlistTab, updateFavoritesTab);

        this.updateUserRating = updateUserRating;
        this.updateHistoryTab = updateHistoryTab;
        this.updateWatchlistTab = updateWatchlistTab;
        this.updateFavoritesTab = updateFavoritesTab;

        this.setShowMoreButtonClickHandler();
    }

    private model: Model;
    private view: FilmsListView;
    private filmCardPresenters: FilmCardPresenter[];
    private updateUserRating: () => void;
    private updateHistoryTab: () => void;
    private updateWatchlistTab: () => void;
    private updateFavoritesTab: () => void;

    public render(element: Element): void {
        this.renderFilmCards();
        element.appendChild(this.view.element);
    }

    public updateFilmsList(films: Movie[]): void {
        this.view.filmsList.films = films;
        this.filmCardPresenters = this.getFilmCardPresentersBy(films,
            this.updateUserRating, this.updateHistoryTab, this.updateWatchlistTab, this.updateFavoritesTab);
        this.renderFilmCards();
    }

    private getFilmCardPresentersBy(films: Movie[] | null,
        updateUserRating: () => void, updateHistoryTab: () => void,
        updateWatchlistTab: () => void, updateFavoritesTab: () => void): FilmCardPresenter[] {

        return films?.map((film) =>
            new FilmCardPresenter(this.model, film,
                updateUserRating, updateHistoryTab,
                updateWatchlistTab, updateFavoritesTab))
            ?? [];
    }

    private renderFilmCards(): void {
        const filmsListContainer = this.view.element.querySelector('.films-list__container');
        if (filmsListContainer) {
            filmsListContainer.innerHTML = '';
            this.filmCardPresenters.forEach((presenter) => {
                presenter.render(filmsListContainer);
            });
        }
    }

    private setShowMoreButtonClickHandler(): void {
        const showMoreButton = this.view.element.querySelector('.films-list__show-more');
        showMoreButton?.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.model.increaseShownFilmsCount();
            this.updateFilmsList(this.model.shownFilms);

            if (this.model.allFilmsShown) {
                this.view.hideShowMoreButton();
            }
        });
    }
}
