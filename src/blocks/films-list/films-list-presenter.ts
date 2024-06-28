import Model from '../../ts/models/model';
import FilmsList from '../../ts/types/films-lists/films-list';
import FilmCardPresenter from '../film-card/film-card-presenter';
import FilmsListView from './films-list-view';

export default class FilmsListPresenter {
    constructor(model: Model, filmsList: FilmsList,
        updateUserRating: () => void, updateHistoryTab: () => void,
        updateWatchlistTab: () => void, updateFavoritesTab: () => void) {

        this.model = model;
        this.view = new FilmsListView(filmsList);

        this.filmCardPresenters = [];
        filmsList.films?.forEach((film) => {
            this.filmCardPresenters.push(
                new FilmCardPresenter(model, film,
                    updateUserRating, updateHistoryTab,
                    updateWatchlistTab, updateFavoritesTab));
        });
    }

    private model: Model;
    private view: FilmsListView;
    private filmCardPresenters: FilmCardPresenter[];
}
