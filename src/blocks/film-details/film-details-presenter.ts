import Model from '../../ts/models/model';
import Movie from '../../ts/types/movie';
import FilmDetailsView from './film-details-view';

const NEW_COMMENT_EMOJI_SIZE = 55;

export default class FilmDetailsPresenter {
    constructor(model: Model, film: Movie,
        updateWatchedFilms: () => void, updateFilmsInWatchlist: () => void, updateFavoriteFilms: () => void) {

        this.model = model;
        this.view = new FilmDetailsView(film);

        this.updateWatchedFilms = updateWatchedFilms;
        this.updateFilmsInWatchlist = updateFilmsInWatchlist;
        this.updateFavoriteFilms = updateFavoriteFilms;

        this.setButtonsClickHandlers();
        this.setCloseHandlers();
        this.setEmojiItemsChangeHandlers();
    }

    private model: Model;
    private view: FilmDetailsView;
    private updateWatchedFilms: () => void;
    private updateFilmsInWatchlist: () => void;
    private updateFavoriteFilms: () => void;

    private setButtonsClickHandlers(): void {
        this.setMarkWatchedButtonClickHandler();
        this.setAddToWatchlistButtonClickHandler();
        this.setAddToFavoritesButtonClickHandler();
    }

    private setMarkWatchedButtonClickHandler(): void {
        const button = this.view.element.querySelector('.film-details__control-label--watched');
        button?.addEventListener('click', () => this.updateWatchedFilms());
    }

    private setAddToWatchlistButtonClickHandler(): void {
        const button = this.view.element.querySelector('.film-details__control-label--watchlist');
        button?.addEventListener('click', () => this.updateFilmsInWatchlist());
    }

    private setAddToFavoritesButtonClickHandler(): void {
        const button = this.view.element.querySelector('.film-details__control-label--favorite');
        button?.addEventListener('click', () => this.updateFavoriteFilms());
    }

    private setCloseHandlers(): void {
        this.setCloseButtonClickHandler();
        this.setCloseKeyDownHandler();

        const closeButton = this.view.element.querySelector('.film-details__close-btn');
        if (closeButton instanceof HTMLElement) {
            setTimeout(() => {
                closeButton.focus();
            }, 1);
        }
    }

    private setCloseButtonClickHandler(): void {
        const button = this.view.element.querySelector('.film-details__close-btn');
        button?.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.view.element.remove();
        });
    }

    private setCloseKeyDownHandler(): void {
        this.view.element.addEventListener('keydown', ((evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                this.view.element.remove();
            }
        }) as EventListener);
    }

    private setEmojiItemsChangeHandlers(): void {
        const emojiItems = this.view.element.querySelectorAll('.film-details__emoji-item');
        emojiItems.forEach((emojiItem) => {
            emojiItem.addEventListener('change', (evt: Event) => {
                if (evt.target instanceof HTMLInputElement) {
                    const emojiItemId = evt.target.id;
                    const emojiImage = this.view.element.querySelector(`[for="${emojiItemId}"] > img`);

                    if (emojiImage && emojiImage instanceof HTMLImageElement) {
                        const newCommentEmoji = this.view.element.querySelector('.film-details__add-emoji-label');
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
}
