import ModelData from '../models-data/model-data';
import Model from '../models/model';
import HeaderView from '../../blocks/header/header-view';
import MainFilmsView from '../../blocks/main/main-films-view';
import FilmCardView from '../../blocks/film-card/film-card-view';
import FooterView from '../../blocks/footer/footer-view';
import FilmDetailsView from '../../blocks/film-details/film-details-view';
import Movie from '../types/movie';
import SortCriterionType from '../types/sort-criterion-type';
import FiltrationCriterionType from '../types/filtration-criterion-type';
import StatisticsScreen from './statistics-screen';
import { getFiltrationCriterionByElement, getSortCriterionByElement } from '../utils';

export default class FilmsScreen {
    constructor(data: ModelData) {
        this.model = new Model(data);
        this.model.updateUserData();
        this.model.resetShownFilmsCount();

        this.headerView = new HeaderView(this.model.isAuthorized, this.model.userData);
        this.mainView = new MainFilmsView(this.model.selectedFiltrationCriterion, this.model.userData,
            this.model.shownFilms, this.model.selectedSortCriterion, this.model.allFilmsShown);
        this.footerView = new FooterView(this.model.allFilmsCount);

        this.setStatsButtonClickHandler();
        this.setFiltrationButtonsClickHandlers();
        this.setSortButtonsClickHandlers();
        this.setFilmsHandlers();
    }

    private model: Model;
    private headerView: HeaderView;
    private mainView: MainFilmsView;
    private footerView: FooterView;
    private isRendered: boolean = false;

    public render(): void {
        if (!this.isRendered) {
            document.body.insertAdjacentElement('afterbegin', this.headerView.element);
            this.headerView.element.insertAdjacentElement('afterend', this.mainView.element);
            this.mainView.element.insertAdjacentElement('afterend', this.footerView.element);
        }
    }

    private setStatsButtonClickHandler(): void {
        const statsButton = this.mainView.element.querySelector('.main-navigation__additional');
        statsButton?.addEventListener('click', (evt: Event) => this.statsButtonClickHandler(evt));
    }

    private setFiltrationButtonsClickHandlers(): void {
        const filtrationButtons = this.mainView.element.querySelectorAll('.main-navigation__item');
        filtrationButtons.forEach((button) => {
            button.addEventListener('click', (evt: Event) => this.filtrationButtonClickHandler(evt));
        });
    }

    private setSortButtonsClickHandlers(): void {
        const sortButtons = this.mainView.element.querySelectorAll('.sort__button');
        sortButtons.forEach((button) => {
            button.addEventListener('click', (evt: Event) => this.sortButtonClickHandler(evt));
        });
    }

    private statsButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        const statisticsScreen = new StatisticsScreen(this.model.modelData);
        document.body.innerHTML = '';
        statisticsScreen.render();
    }

    private filtrationButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        const button = evt.target;
        if (button instanceof Element) {
            const filtrationCriterion = getFiltrationCriterionByElement(button);
            this.filterFilms(filtrationCriterion);
        }
    }

    private sortButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        const button = evt.target;
        if (button instanceof Element) {
            const sortCriterion = getSortCriterionByElement(button);
            this.sortFilms(sortCriterion);
        }
    }

    private filterFilms(filtrationCriterion: FiltrationCriterionType): void {
        this.model.selectedFiltrationCriterion = filtrationCriterion;
        this.model.selectedSortCriterion = SortCriterionType.Default;
        this.model.resetShownFilmsCount();
        this.mainView.updateSelectedFiltrationCriterion(filtrationCriterion);
        this.mainView.updateSelectedSortCriterion(SortCriterionType.Default);
        this.mainView.updateFilmsSection(this.model.shownFilms, this.model.allFilmsShown);
        this.setFilmsHandlers();
    }

    private sortFilms(sortCriterion: SortCriterionType): void {
        this.model.selectedSortCriterion = sortCriterion;
        this.model.resetShownFilmsCount();
        this.mainView.updateSelectedSortCriterion(sortCriterion);
        this.mainView.updateFilmsSection(this.model.shownFilms, this.model.allFilmsShown);
        this.setFilmsHandlers();
    }

    private setFilmsHandlers(): void {
        this.setFilmCardsClickHandlers();
        this.setShowMoreButtonClickHandler();
    }

    private setFilmCardsClickHandlers(): void {
        const filmsListViews = this.mainView.filmsView.filmsListViews;
        filmsListViews.forEach((filmsListView) => {
            const filmCardViews = filmsListView.filmCardViews;
            filmCardViews.forEach((filmCardView) => {
                this.setMarkWatchedButtonClickHandler(filmCardView);
                this.setAddToWatchlistButtonClickHandler(filmCardView);
                this.setAddToFavoritesButtonClickHandler(filmCardView);
                this.setPopupOpenClickHandlers(filmCardView);
            });
        });
    }

    private setMarkWatchedButtonClickHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--mark-as-watched');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');

            const userDetails = filmCardView.film.userDetails;
            userDetails.alreadyWatched = !userDetails.alreadyWatched;

            if (userDetails.alreadyWatched) {
                this.model.incrementFilmsWatched();
            } else {
                this.model.decrementFilmsWatched();
                this.removeFilmCardIfNeeded(filmCardView.element, FiltrationCriterionType.History);
            }

            this.headerView.updateUserRating();
            this.mainView.mainNavigationView.updateHistory();
        });
    }

    private setAddToWatchlistButtonClickHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--add-to-watchlist');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');

            const userDetails = filmCardView.film.userDetails;
            userDetails.watchlist = !userDetails.watchlist;

            if (userDetails.watchlist) {
                this.model.incrementFilmsInWatchlist();
            } else {
                this.model.decrementFilmsInWatchlist();
                this.removeFilmCardIfNeeded(filmCardView.element, FiltrationCriterionType.Watchlist);
            }

            this.mainView.mainNavigationView.updateWatchlist();
        });
    }

    private setAddToFavoritesButtonClickHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--favorite');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');

            const userDetails = filmCardView.film.userDetails;
            userDetails.favorite = !userDetails.favorite;

            if (userDetails.favorite) {
                this.model.incrementFavoriteFilms();
            } else {
                this.model.decrementFavoriteFilms();
                this.removeFilmCardIfNeeded(filmCardView.element, FiltrationCriterionType.Favorites);
            }

            this.mainView.mainNavigationView.updateFavorites();
        });
    }

    private removeFilmCardIfNeeded(filmCardElement: Element, filtrationCriterion: FiltrationCriterionType): void {
        if (this.model.selectedFiltrationCriterion === filtrationCriterion) {
            filmCardElement.remove();
        }
    }

    private setPopupOpenClickHandlers(filmCardView: FilmCardView): void {
        const poster = filmCardView.element.querySelector('.film-card__poster');
        const title = filmCardView.element.querySelector('.film-card__title');
        const comments = filmCardView.element.querySelector('.film-card__comments');

        if (poster) {
            this.setPopupOpenClickHandler(poster, filmCardView.film);
        }

        if (title) {
            this.setPopupOpenClickHandler(title, filmCardView.film);
        }

        if (comments) {
            this.setPopupOpenClickHandler(comments, filmCardView.film);
        }
    }

    private setPopupOpenClickHandler(element: Element, film: Movie): void {
        element.addEventListener('click', (evt: Event) => {
            evt.preventDefault();

            const popupView = new FilmDetailsView(film);
            const popupElement = popupView.element;

            const popupCloseButton = popupElement.querySelector('.film-details__close-btn');
            popupCloseButton?.addEventListener('click', (evt: Event) => {
                evt.preventDefault();
                popupElement.remove();
            });

            this.footerView.element.insertAdjacentElement('afterend', popupElement);
        });
    }

    private setShowMoreButtonClickHandler(): void {
        const showMoreButton = this.mainView.element.querySelector('.films-list__show-more');
        showMoreButton?.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.model.increaseShownFilmsCount();
            this.mainView.updateAllMoviesFilmsList(this.model.shownFilms);
            this.setFilmCardsClickHandlers();

            if (this.model.allFilmsShown) {
                this.mainView.hideShowMoreButton();
            }
        });
    }
}
