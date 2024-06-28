import Model from '../../ts/models/model';
import Movie from '../../ts/types/movie';
import FilmCardView from './film-card-view';
import FilmDetailsPresenter from '../film-details/film-details-presenter';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';

export default class FilmCardPresenter {
    constructor(model: Model, film: Movie,
        updateUserRating: () => void, updateHistoryTab: () => void,
        updateWatchlistTab: () => void, updateFavoritesTab: () => void) {

        this.model = model;
        this.view = new FilmCardView(film);
        this.popupPresenter = new FilmDetailsPresenter(model, film,
            this.updateWatchedFilms, this.updateFilmsInWatchlist, this.updateFavoriteFilms);

        this.updateUserRating = updateUserRating;
        this.updateHistoryTab = updateHistoryTab;
        this.updateWatchlistTab = updateWatchlistTab;
        this.updateFavoritesTab = updateFavoritesTab;

        this.setButtonsClickHandlers();
        this.setPopupOpenClickHandlers();
    }

    private model: Model;
    private view: FilmCardView;
    private popupPresenter: FilmDetailsPresenter;
    private updateUserRating: () => void;
    private updateHistoryTab: () => void;
    private updateWatchlistTab: () => void;
    private updateFavoritesTab: () => void;

    private setButtonsClickHandlers(): void {
        this.setMarkWatchedButtonClickHandler();
        this.setAddToWatchlistButtonClickHandler();
        this.setAddToFavoritesButtonClickHandler();
    }

    private setMarkWatchedButtonClickHandler(): void {
        const button = this.view.element.querySelector('.film-card__controls-item--mark-as-watched');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');
            this.updateWatchedFilms();
        });
    }

    private setAddToWatchlistButtonClickHandler(): void {
        const button = this.view.element.querySelector('.film-card__controls-item--add-to-watchlist');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');
            this.updateFilmsInWatchlist();
        });
    }

    private setAddToFavoritesButtonClickHandler(): void {
        const button = this.view.element.querySelector('.film-card__controls-item--favorite');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');
            this.updateFavoriteFilms();
        });
    }

    private updateWatchedFilms(): void {
        const userDetails = this.view.film.userDetails;
        userDetails.alreadyWatched = !userDetails.alreadyWatched;

        if (userDetails.alreadyWatched) {
            userDetails.watchingDate = new Date();
            this.model.incrementFilmsWatched();
        } else {
            userDetails.watchingDate = null;
            this.model.decrementFilmsWatched();
            this.removeFilmCardIfNeeded(FiltrationCriterionType.History);
        }

        this.updateUserRating();
        this.updateHistoryTab();
    }

    private updateFilmsInWatchlist(): void {
        const userDetails = this.view.film.userDetails;
        userDetails.watchlist = !userDetails.watchlist;

        if (userDetails.watchlist) {
            this.model.incrementFilmsInWatchlist();
        } else {
            this.model.decrementFilmsInWatchlist();
            this.removeFilmCardIfNeeded(FiltrationCriterionType.Watchlist);
        }

        this.updateWatchlistTab();
    }

    private updateFavoriteFilms(): void {
        const userDetails = this.view.film.userDetails;
        userDetails.favorite = !userDetails.favorite;

        if (userDetails.favorite) {
            this.model.incrementFavoriteFilms();
        } else {
            this.model.decrementFavoriteFilms();
            this.removeFilmCardIfNeeded(FiltrationCriterionType.Favorites);
        }

        this.updateFavoritesTab();
    }

    private removeFilmCardIfNeeded(filtrationCriterion: FiltrationCriterionType): void {
        if (this.model.selectedFiltrationCriterion === filtrationCriterion) {
            this.view.element.remove();
        }
    }

    private setPopupOpenClickHandlers(): void {
        const poster = this.view.element.querySelector('.film-card__poster');
        const title = this.view.element.querySelector('.film-card__title');
        const comment = this.view.element.querySelector('.film-card__comments');

        if (poster) {
            this.setPopupOpenClickHandler(poster);
        }

        if (title) {
            this.setPopupOpenClickHandler(title);
        }

        if (comment) {
            this.setPopupOpenClickHandler(comment);
        }
    }

    private setPopupOpenClickHandler(element: Element): void {
        element.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.popupPresenter.render();
        });
    }
}
