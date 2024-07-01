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
        this.filmCardPresenters = filmsList.films?.map((film) =>
            new FilmCardPresenter(model, film,
                updateUserRating, updateHistoryTab,
                updateWatchlistTab, updateFavoritesTab))
            ?? [];
    }

    private model: Model;
    private view: FilmsListView;
    private filmCardPresenters: FilmCardPresenter[];

    public render(element: Element): void {

        element.appendChild(this.view.element);
    }

    public updateFilmsList(films: Movie[]): void {
        this.view.filmsList.films = films;
        this.view.setFilmCardViews();
        this.renderFilmCards();
    }

    private renderFilmCards(): void {
        const filmsListContainer = this.view.element.querySelector('.films-list__container');
        if (filmsListContainer) {
            filmsListContainer.innerHTML = '';
            const filmCardsElements = this.filmCardPresenters.map((presenter) => presenter.getFilmCardElement());
            filmCardsElements.forEach((filmCardElement) => {
                this.view.element.appendChild(filmCardElement);
            });
        }
    }
}
