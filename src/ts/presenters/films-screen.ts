import ModelData from '../models-data/model-data';
import Model from '../models/model';
import HeaderView from '../../blocks/header/header-view';
import MainFilmsView from '../../blocks/main/main-films-view';
import FilmCardView from '../../blocks/film-card/film-card-view';
import FooterView from '../../blocks/footer/footer-view';
import FilmDetailsView from '../../blocks/film-details/film-details-view';
import SortCriterionType from '../types/sort-criterion-type';
import FiltrationCriterionType from '../types/filtration-criterion-type';
import Application from '../application';
import { getFiltrationCriterionByElement, getSortCriterionByElement } from '../utils';
import { NEW_COMMENT_EMOJI_SIZE } from '../../settings';

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

    public render(): void {
        document.body.innerHTML = '';
        document.body.insertAdjacentElement('afterbegin', this.headerView.element);
        this.headerView.element.insertAdjacentElement('afterend', this.mainView.element);
        this.mainView.element.insertAdjacentElement('afterend', this.footerView.element);
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
            this.updateWatchedFilms(filmCardView);
        });
    }

    private setAddToWatchlistButtonClickHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--add-to-watchlist');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');
            this.updateFilmsInWatchlist(filmCardView);
        });
    }

    private setAddToFavoritesButtonClickHandler(filmCardView: FilmCardView): void {
        const button = filmCardView.element.querySelector('.film-card__controls-item--favorite');
        button?.addEventListener('click', () => {
            button.classList.toggle('film-card__controls-item--active');
            this.updateFavoriteFilms(filmCardView);
        });
    }

    private updateWatchedFilms(filmCardView: FilmCardView): void {
        const userDetails = filmCardView.film.userDetails;
        userDetails.alreadyWatched = !userDetails.alreadyWatched;

        if (userDetails.alreadyWatched) {
            userDetails.watchingDate = new Date();
            this.model.incrementFilmsWatched();
        } else {
            userDetails.watchingDate = null;
            this.model.decrementFilmsWatched();
            this.removeFilmCardIfNeeded(filmCardView.element, FiltrationCriterionType.History);
        }

        this.headerView.updateUserRating();
        this.mainView.mainNavigationView.updateHistory();
    }

    private updateFilmsInWatchlist(filmCardView: FilmCardView): void {
        const userDetails = filmCardView.film.userDetails;
        userDetails.watchlist = !userDetails.watchlist;

        if (userDetails.watchlist) {
            this.model.incrementFilmsInWatchlist();
        } else {
            this.model.decrementFilmsInWatchlist();
            this.removeFilmCardIfNeeded(filmCardView.element, FiltrationCriterionType.Watchlist);
        }

        this.mainView.mainNavigationView.updateWatchlist();
    }

    private updateFavoriteFilms(filmCardView: FilmCardView): void {
        const userDetails = filmCardView.film.userDetails;
        userDetails.favorite = !userDetails.favorite;

        if (userDetails.favorite) {
            this.model.incrementFavoriteFilms();
        } else {
            this.model.decrementFavoriteFilms();
            this.removeFilmCardIfNeeded(filmCardView.element, FiltrationCriterionType.Favorites);
        }

        this.mainView.mainNavigationView.updateFavorites();
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
            this.setPopupOpenClickHandler(poster, filmCardView);
        }

        if (title) {
            this.setPopupOpenClickHandler(title, filmCardView);
        }

        if (comments) {
            this.setPopupOpenClickHandler(comments, filmCardView);
        }
    }

    private setPopupOpenClickHandler(element: Element, filmCardView: FilmCardView): void {
        element.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.closePopupIfOpened();

            const popupView = new FilmDetailsView(filmCardView.film);
            const popupElement = popupView.element;

            this.setPopupMarkWatchedButtonClickHandler(popupElement, filmCardView);
            this.setPopupAddToWatchlistButtonClickHandler(popupElement, filmCardView);
            this.setPopupAddToFavoritesButtonClickHandler(popupElement, filmCardView);
            this.setPopupCloseButtonClickHandler(popupElement);
            this.setPopupCloseKeyDownHandler(popupElement);
            this.setPopupEmojiItemsChangeHandlers(popupElement);
            this.setCommentFormHandlers(popupElement);

            const popupCloseButton = popupElement.querySelector('.film-details__close-btn');
            if (popupCloseButton instanceof HTMLElement) {      //  It doesn't work without setTimeout()
                setTimeout(() => popupCloseButton.focus(), 1);
            }

            this.footerView.element.insertAdjacentElement('afterend', popupElement);
        });
    }

    private closePopupIfOpened(): void {
        const openedPopupElement = document.querySelector('.film-details');
        openedPopupElement?.remove();
    }

    private setPopupMarkWatchedButtonClickHandler(popupElement: Element, filmCardView: FilmCardView): void {
        const button = popupElement.querySelector('.film-details__control-label--watched');
        button?.addEventListener('click', () => {
            this.updateWatchedFilms(filmCardView);
        });
    }

    private setPopupAddToWatchlistButtonClickHandler(popupElement: Element, filmCardView: FilmCardView): void {
        const button = popupElement.querySelector('.film-details__control-label--watchlist');
        button?.addEventListener('click', () => {
            this.updateFilmsInWatchlist(filmCardView);
        });
    }

    private setPopupAddToFavoritesButtonClickHandler(popupElement: Element, filmCardView: FilmCardView): void {
        const button = popupElement.querySelector('.film-details__control-label--favorite');
        button?.addEventListener('click', () => {
            this.updateFavoriteFilms(filmCardView);
        })
    }

    private setPopupCloseButtonClickHandler(popupElement: Element): void {
        const button = popupElement.querySelector('.film-details__close-btn');
        button?.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            popupElement.remove();
        });
    }

    private setPopupCloseKeyDownHandler(popupElement: Element): void {
        popupElement.addEventListener('keydown', ((evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                popupElement.remove();
            }
        }) as EventListener);
    }

    private setPopupEmojiItemsChangeHandlers(popupElement: Element): void {
        const emojiItems = popupElement.querySelectorAll('.film-details__emoji-item');
        emojiItems.forEach((emojiItem) => {
            emojiItem.addEventListener('change', (evt: Event) => {
                if (evt.target instanceof HTMLInputElement) {
                    const emojiItemId = evt.target.id;
                    const emojiImage = popupElement.querySelector(`[for="${emojiItemId}"] > img`);

                    if (emojiImage && emojiImage instanceof HTMLImageElement) {
                        const newCommentEmoji = popupElement.querySelector('.film-details__add-emoji-label');
                        if (newCommentEmoji) {
                            newCommentEmoji.innerHTML = '';

                            const newEmojiImage = document.createElement('img');
                            newEmojiImage.width = NEW_COMMENT_EMOJI_SIZE;
                            newEmojiImage.height = NEW_COMMENT_EMOJI_SIZE;
                            newEmojiImage.src = emojiImage.src;
                            newEmojiImage.alt = emojiItemId;

                            newCommentEmoji.appendChild(newEmojiImage);
                        }
                    }
                }
            });
        });
    }

    private setCommentFormHandlers(popupElement: Element): void {
        const formElement = popupElement.querySelector('.film-details__inner');
        if (formElement instanceof HTMLFormElement) {
            this.setCommentInputKeyUpHandler(formElement);
            this.setCommentFormSubmitHandler(formElement);
        }
    }

    private setCommentInputKeyUpHandler(formElement: HTMLFormElement): void {
        const commentInputElement = formElement.querySelector('.film-details__new-comment textarea');
        commentInputElement?.addEventListener('keyup', ((evt: KeyboardEvent) => {
            if (evt.key === 'Enter' && evt.ctrlKey) {
                evt.preventDefault();
                formElement.requestSubmit();
            }
        }) as EventListener);
    }

    private setCommentFormSubmitHandler(formElement: HTMLFormElement): void {
        formElement.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();

            const commentInputElement = formElement.querySelector('.film-details__new-comment textarea');
            if (commentInputElement instanceof HTMLTextAreaElement) {
                commentInputElement.value = '';
            }

            const emojiElements = formElement.querySelectorAll('.film-details__emoji-item');
            emojiElements.forEach((element) => {
                if (element instanceof HTMLInputElement) {
                    element.checked = false;
                }
            });

            const newCommentEmojiElement = formElement.querySelector('.film-details__add-emoji-label');
            if (newCommentEmojiElement) {
                newCommentEmojiElement.innerHTML = '';
            }
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
