import ModelData from '../models-data/model-data';
import Model from '../models/model';
import HeaderView from '../../blocks/header/header-view';
import MainFilmsView from '../../blocks/main/main-films-view';
import FooterView from '../../blocks/footer/footer-view';
import FilmDetailsView from '../../blocks/film-details/film-details-view';
import SortType from '../types/sort-type';
import FiltrationType from '../types/filtration-type';
import Movie from '../types/movie';
import Comment from '../types/comment';
import LocalComment from '../types/local-comment';
import Emotion from '../types/emotion';
import UserDetails from '../types/user-details';
import Application from '../application';
import HttpClient from '../http-api/http-client';
import he from 'he';
import { getFiltrationCriterionByElement, getSortCriterionByElement } from '../utils';
import { IS_DEBUG, SERVER_ORIGIN } from '../../settings';
import { comments as debugComments } from '../../debug-data';

export default class FilmsScreen {
    constructor(data: ModelData) {
        this.model = new Model(data);
        this.model.updateUserData();
        this.model.resetShownFilmsCount();

        const filmCardHandlers = {
            markWatchedButtonClickHandler: this.markWatchedButtonClickHandler.bind(this),
            watchlistButtonClickHandler: this.watchlistButtonClickHandler.bind(this),
            favoritesButtonClickHandler: this.favoritesButtonClickHandler.bind(this),
            popupOpenClickHandler: this.popupOpenClickHandler.bind(this),
            showMoreButtonClickHandler: this.showMoreButtonClickHandler.bind(this)
        };

        this.headerView = new HeaderView(this.model.isAuthorized, this.model.userData);
        this.mainView = new MainFilmsView(this.model.filtrationSelected, this.model.userData,
            this.model.shownFilms, this.model.sortSelected, this.model.areAllFilmsShown,
            this.model.areFilmsLoaded, this.model.isLoadingFailed, filmCardHandlers
        );
        this.footerView = new FooterView(this.model.allFilmsCount);

        this.mainView.sortView.buttonClickHandler = this.sortButtonClickHandler.bind(this);
        this.mainView.mainNavigationView.buttonClickHandler = this.filtrationButtonClickHandler.bind(this);
        this.mainView.mainNavigationView.statsButtonClickHandler = this.statsButtonClickHandler.bind(this);

        this.httpClient = new HttpClient(SERVER_ORIGIN, Application.authorizationString);

        if (!this.model.areFilmsLoaded) {
            if (!IS_DEBUG) {
                this.loadFilms();
            } else {
                this.initializeDebugFilms();
            }
        }
    }

    private model: Model;
    private headerView: HeaderView;
    private mainView: MainFilmsView;
    private footerView: FooterView;
    private httpClient: HttpClient;

    public render(): void {
        document.body.innerHTML = '';
        document.body.insertAdjacentElement('afterbegin', this.headerView.element);
        this.headerView.element.insertAdjacentElement('afterend', this.mainView.element);
        this.mainView.element.insertAdjacentElement('afterend', this.footerView.element);
    }

    private async loadFilms(): Promise<void> {
        try {
            const films = await this.httpClient.readMovies();
            this.handleFilmsLoadingSuccess(films);
        } catch (err: unknown) {
            this.handleFilmsLoadingError();
        }
    }

    private async loadComments(filmDetailsView: FilmDetailsView): Promise<void> {
        try {
            const comments = await this.httpClient.readComments(Number(filmDetailsView.film.id));
            this.handleCommentsLoadingSuccess(comments, filmDetailsView);
        } catch (err: unknown) {
            this.handleCommentsLoadingError();
            //  TODO: Add an error handling
        }
    }

    private async initializeDebugFilms(): Promise<void> {
        this.handleFilmsLoadingSuccess(this.model.allFilms);
    }

    private async initializeDebugComments(commentsIds: string[], filmDetailsView: FilmDetailsView): Promise<void> {
        const comments = debugComments.filter((comment) => commentsIds.includes(comment.id));
        this.handleCommentsLoadingSuccess(comments, filmDetailsView);
    }

    private handleFilmsLoadingSuccess(films: Movie[]): void {
        this.model.films = films;
        this.model.updateUserData();
        this.mainView.mainNavigationView.updateWatchlist();
        this.mainView.mainNavigationView.updateHistory();
        this.mainView.mainNavigationView.updateFavorites();
        this.mainView.updateFilmsSection(this.model.shownFilms, this.model.areAllFilmsShown,
            this.model.areFilmsLoaded, this.model.isLoadingFailed
        );
        this.mainView.updateSortPanelVisibility();
        this.headerView.updateUserRating();
        this.footerView.updateTotalFilmsCount(this.model.allFilmsCount);
    }

    private handleFilmsLoadingError(): void {
        this.model.isLoadingFailed = true;
        this.mainView.updateFilmsSection(this.model.shownFilms, this.model.areAllFilmsShown,
            this.model.areFilmsLoaded, this.model.isLoadingFailed);
    }

    private handleCommentsLoadingSuccess(comments: Comment[], filmDetailsView: FilmDetailsView): void {
        filmDetailsView.updateComments(comments);
    }

    private handleCommentsLoadingError(): void {

    }

    private statsButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        Application.showStatistics(this.model.modelData);
    }

    private filtrationButtonClickHandler(evt: Event): void {
        evt.preventDefault();
        const button = evt.currentTarget;
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

    private filterFilms(filtrationCriterion: FiltrationType): void {
        this.model.filtrationSelected = filtrationCriterion;
        this.model.sortSelected = SortType.Default;
        this.model.resetShownFilmsCount();
        this.mainView.updateSelectedFiltrationCriterion(filtrationCriterion);
        this.mainView.updateSelectedSortCriterion(SortType.Default);
        this.mainView.updateFilmsSection(this.model.shownFilms, this.model.areAllFilmsShown,
            this.model.areFilmsLoaded, this.model.isLoadingFailed
        );
    }

    private sortFilms(sortCriterion: SortType): void {
        this.model.sortSelected = sortCriterion;
        this.model.resetShownFilmsCount();
        this.mainView.updateSelectedSortCriterion(sortCriterion);
        this.mainView.updateFilmsSection(this.model.shownFilms, this.model.areAllFilmsShown,
            this.model.areFilmsLoaded, this.model.isLoadingFailed
        );
    }

    private markWatchedButtonClickHandler(evt: Event): void {
        if (evt.target instanceof Element) {
            const filmId = this.getFilmIdViaFilmCard(evt.target);
            this.updateWatchedFilms(filmId);
            this.mainView.toggleMarkWatchedButtonState(filmId);
        }
    }

    private watchlistButtonClickHandler(evt: Event): void {
        if (evt.target instanceof Element) {
            const filmId = this.getFilmIdViaFilmCard(evt.target);
            this.updateFilmsInWatchlist(filmId);
            this.mainView.toggleWatchlistButtonState(filmId);
        }
    }

    private favoritesButtonClickHandler(evt: Event): void {
        if (evt.target instanceof Element) {
            const filmId = this.getFilmIdViaFilmCard(evt.target);
            this.updateFavoriteFilms(filmId);
            this.mainView.toggleFavoritesButtonState(filmId);
        }
    }

    private popupMarkWatchedButtonClickHandler(evt: Event): void {
        if (evt.target instanceof Element) {
            const filmId = this.getFilmIdViaFilmDetails(evt.target);
            this.updateWatchedFilms(filmId);
            this.mainView.toggleMarkWatchedButtonState(filmId);
        }
    }

    private popupWatchlistButtonClickHandler(evt: Event): void {
        if (evt.target instanceof Element) {
            const filmId = this.getFilmIdViaFilmDetails(evt.target);
            this.updateFilmsInWatchlist(filmId);
            this.mainView.toggleWatchlistButtonState(filmId);
        }
    }

    private popupFavoritesButtonClickHandler(evt: Event): void {
        if (evt.target instanceof Element) {
            const filmId = this.getFilmIdViaFilmDetails(evt.target);
            this.updateFavoriteFilms(filmId);
            this.mainView.toggleFavoritesButtonState(filmId);
        }
    }

    private updateWatchedFilms(filmId: string): void {
        const userDetails = this.getUserDetails(filmId);
        userDetails.alreadyWatched = !userDetails.alreadyWatched;

        if (userDetails.alreadyWatched) {
            userDetails.watchingDate = new Date();
            this.model.incrementFilmsWatched();
        } else {
            userDetails.watchingDate = null;
            this.model.decrementFilmsWatched();
            this.removeFilmCardIfNeeded(filmId, FiltrationType.History);
        }

        this.headerView.updateUserRating();
        this.mainView.mainNavigationView.updateHistory();
    }

    private updateFilmsInWatchlist(filmId: string): void {
        const userDetails = this.getUserDetails(filmId);
        userDetails.watchlist = !userDetails.watchlist;

        if (userDetails.watchlist) {
            this.model.incrementFilmsInWatchlist();
        } else {
            this.model.decrementFilmsInWatchlist();
            this.removeFilmCardIfNeeded(filmId, FiltrationType.Watchlist);
        }

        this.mainView.mainNavigationView.updateWatchlist();
    }

    private updateFavoriteFilms(filmId: string): void {
        const userDetails = this.getUserDetails(filmId);
        userDetails.favorite = !userDetails.favorite;

        if (userDetails.favorite) {
            this.model.incrementFavoriteFilms();
        } else {
            this.model.decrementFavoriteFilms();
            this.removeFilmCardIfNeeded(filmId, FiltrationType.Favorites);
        }

        this.mainView.mainNavigationView.updateFavorites();
    }

    private getUserDetails(filmId: string): UserDetails {
        const film = this.getFilmById(filmId);
        return film.userDetails;
    }

    private getFilmById(filmId: string): Movie {
        const film = this.model.allFilms.find((film) => film.id === filmId);
        if (film) {
            return film;
        } else {
            throw new Error('Given film is not found.');
        }
    }

    private removeFilmCardIfNeeded(filmId: string, filtrationCriterion: FiltrationType): void {
        const filmCardElement = document.querySelector(`.film-card[data-film-id="${filmId}"]`);
        if (filmCardElement && this.model.filtrationSelected === filtrationCriterion) {
            filmCardElement.remove();
        }
    }

    private popupOpenClickHandler(evt: Event): void {
        evt.preventDefault();
        this.closePopupIfOpened();

        if (evt.target instanceof Element) {
            const filmId = this.getFilmIdViaFilmCard(evt.target);
            const film = this.getFilmById(filmId);
            const popupView = new FilmDetailsView(film);

            popupView.markWatchedButtonClickHandler = this.popupMarkWatchedButtonClickHandler.bind(this);
            popupView.watchlistButtonClickHandler = this.popupWatchlistButtonClickHandler.bind(this);
            popupView.favoritesButtonClickHandler = this.popupFavoritesButtonClickHandler.bind(this);

            const commentFormElement = popupView.getCommentFormElement();
            this.setCommentFormSubmitHandler(commentFormElement, popupView);

            this.footerView.element.insertAdjacentElement('afterend', popupView.element);

            if (!IS_DEBUG) {
                this.loadComments(popupView);
            } else {
                this.initializeDebugComments(film.comments, popupView);
            }
        }
    }

    private closePopupIfOpened(): void {
        const openedPopupElement = document.querySelector('.film-details');
        openedPopupElement?.remove();
    }

    private setCommentFormSubmitHandler(formElement: HTMLFormElement, filmDetailsView: FilmDetailsView): void {
        formElement.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();

            const commentText = he.encode(filmDetailsView.getCommentText());
            const commentDate = new Date();
            const commentEmotion = this.getEmotionByElement(filmDetailsView.getSelectedEmojiElement());

            const newComment = new LocalComment(
                commentText,
                commentDate,
                commentEmotion
            );

            filmDetailsView.resetCommentForm();
        });
    }

    private getEmotionByElement(emojiElement: HTMLInputElement): Emotion {
        const key: keyof typeof Emotion = Object.keys(Emotion)[
            Object.values(Emotion).indexOf(emojiElement.value as unknown as Emotion)
        ] as keyof typeof Emotion;
        return Emotion[key];
    }

    private showMoreButtonClickHandler(_: Event): void {
        this.model.increaseShownFilmsCount();
        this.mainView.updateAllMoviesFilmsList(this.model.shownFilms);
        if (this.model.areAllFilmsShown) {
            this.mainView.hideShowMoreButton();
        }
    }

    private getFilmIdViaFilmCard(element: Element): string {
        const filmCardElement = element.closest('.film-card');
        return this.getFilmIdFromElement(filmCardElement);
    }

    private getFilmIdViaFilmDetails(element: Element): string {
        const filmDetailsElement = element.closest('.film-details');
        return this.getFilmIdFromElement(filmDetailsElement);
    }

    private getFilmIdFromElement(element: Element | null): string {
        if (!(element instanceof HTMLElement)) {
            throw new Error('Given element is not a film card.');
        }

        if (!element.dataset.filmId) {
            throw new Error('Film card element does not contain a film id.');
        }

        return element.dataset.filmId;
    }
}
