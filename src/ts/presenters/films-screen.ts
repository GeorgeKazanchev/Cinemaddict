import ModelData from '../models-data/model-data';
import Model from '../models/model';
import HeaderView from '../../blocks/header/header-view';
import MainFilmsView from '../../blocks/main/main-films-view';
import FilmCardView from '../../blocks/film-card/film-card-view';
import FooterView from '../../blocks/footer/footer-view';
import FilmDetailsView from '../../blocks/film-details/film-details-view';
import FilmsSection from '../types/films-sections/films-section';
import Movie from '../types/movie';

export default class FilmsScreen {
    constructor(data: ModelData) {
        this.model = new Model(data);
        this.headerView = new HeaderView(this.model.isAuthorized, this.model.userData);
        this.mainView = new MainFilmsView(this.model.selectedNavigationItem, this.model.userData,
            this.model.filmsSection, this.model.selectedSortCriterion);
        this.footerView = new FooterView(this.model.filmsCount);

        this.setFilmCardButtonsHandlers();
        this.setFilmCardPopupOpenHandlers();
    }

    private model: Model;
    private headerView: HeaderView;
    private mainView: MainFilmsView;
    private footerView: FooterView;
    private isRendered: boolean = false;

    public get filmsSection(): FilmsSection {
        return this.model.filmsSection;
    }

    public render(): void {
        if (!this.isRendered) {
            document.body.insertAdjacentElement('afterbegin', this.headerView.element);
            this.headerView.element.insertAdjacentElement('afterend', this.mainView.element);
            this.mainView.element.insertAdjacentElement('afterend', this.footerView.element);
        }
    }

    private setFilmCardButtonsHandlers(): void {
        const filmsListViews = this.mainView.filmsView?.filmsListViews;
        filmsListViews.forEach((filmsListView) => {
            const filmCardViews = filmsListView.filmCardViews;
            filmCardViews?.forEach((filmCardView) => {
                this.setMarkFilmWatchedButtonHandler(filmCardView);
                this.setAddFilmToWatchlistButtonHandler(filmCardView);
                this.setAddFilmToFavoritesButtonHandler(filmCardView);
            });
        });
    }

    private setFilmCardPopupOpenHandlers(): void {
        const filmsListViews = this.mainView.filmsView?.filmsListViews;
        filmsListViews.forEach((filmsListView) => {
            const filmCardViews = filmsListView.filmCardViews;
            filmCardViews?.forEach((filmCardView) => {
                const poster = filmCardView.element.querySelector('.film-card__poster');
                const title = filmCardView.element.querySelector('.film-card__title');
                const comments = filmCardView.element.querySelector('.film-card__comments');

                if (poster) {
                    this.setFilmPopupOpenHandler(poster, filmCardView.film);
                }

                if (title) {
                    this.setFilmPopupOpenHandler(title, filmCardView.film);
                }

                if (comments) {
                    this.setFilmPopupOpenHandler(comments, filmCardView.film);
                }
            });
        });
    }

    private setMarkFilmWatchedButtonHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--mark-as-watched');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');

            const userDetails = filmCardView.film.userDetails;
            userDetails.alreadyWatched = !userDetails.alreadyWatched;

            if (userDetails.alreadyWatched) {
                this.model.incrementFilmsWatched();
            } else {
                this.model.decrementFilmsWatched();
            }

            this.headerView.updateUserRating();
            this.mainView.mainNavigationView.updateHistoryTab();
        });
    }

    private setAddFilmToWatchlistButtonHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--add-to-watchlist');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');

            const userDetails = filmCardView.film.userDetails;
            userDetails.watchlist = !userDetails.watchlist;

            if (userDetails.watchlist) {
                this.model.incrementFilmsInWatchlist();
            } else {
                this.model.decrementFilmsInWatchlist();
            }

            this.mainView.mainNavigationView.updateWatchlistTab();
        });
    }

    private setAddFilmToFavoritesButtonHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--favorite');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');

            const userDetails = filmCardView.film.userDetails;
            userDetails.favorite = !userDetails.favorite;

            if (userDetails.favorite) {
                this.model.incrementFavoriteFilms();
            } else {
                this.model.decrementFavoriteFilms();
            }

            this.mainView.mainNavigationView.updateFavoritesTab();
        });
    }

    private setFilmPopupOpenHandler(element: Element, film: Movie): void {
        element.addEventListener('click', () => {
            const popupView = new FilmDetailsView(film);
            const popupElement = popupView.element;

            const popupCloseButton = popupElement.querySelector('.film-details__close-btn');
            popupCloseButton?.addEventListener('click', () => {
                popupElement.remove();
            });

            this.footerView.element.insertAdjacentElement('afterend', popupElement);
        });
    }
}