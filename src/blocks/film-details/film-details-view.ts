import AbstractView from '../../ts/abstract-view';
import FilmDetailsCommentView from './__comment/film-details__comment-view';
import Movie from '../../ts/types/movie';
import Comment from '../../ts/types/comment';
import { NEW_COMMENT_EMOJI_SIZE } from '../../settings';

export default class FilmDetailsView extends AbstractView {
    constructor(film: Movie) {
        super();
        this.film = film;
    }

    film: Movie;

    public get template(): string {
        return `<section class="film-details" data-film-id="${this.film.id}">
                    <form class="film-details__inner" action="" method="get">
                        <div class="film-details__top-container">
                            <div class="film-details__close">
                                <button class="film-details__close-btn" type="button">close</button>
                            </div>
                            <div class="film-details__info-wrap">
                                <div class="film-details__poster">
                                    <img class="film-details__poster-img"
                                        src="${this.film.filmInfo.poster}" alt="${this.film.filmInfo.title}">
                                    <p class="film-details__age">${this.film.filmInfo.ageRating.toFixed(0)}+</p>
                                </div>
                                <div class="film-details__info">
                                    <div class="film-details__info-head">
                                        <div class="film-details__title-wrap">
                                            <h3 class="film-details__title">${this.film.filmInfo.title}</h3>
                                            <p class="film-details__title-original">Original: ${this.film.filmInfo.alternativeTitle}</p>
                                        </div>
                                        <div class="film-details__rating">
                                            <p class="film-details__total-rating">${this.film.filmInfo.totalRating.toFixed(1)}</p>
                                        </div>
                                    </div>
                                    <table class="film-details__table">
                                        <tr class="film-details__row film-details__row--director">
                                            <td class="film-details__term">Director</td>
                                            <td class="film-details__cell">${this.film.filmInfo.director}</td>
                                        </tr>
                                        <tr class="film-details__row film-details__row--writers">
                                            <td class="film-details__term">Writers</td>
                                                <td class="film-details__cell">${this.film.filmInfo.writers.join(', ')}</td>
                                        </tr>
                                        <tr class="film-details__row film-details__row--actors">
                                            <td class="film-details__term">Actors</td>
                                            <td class="film-details__cell">${this.film.filmInfo.actors.join(', ')}</td>
                                        </tr>
                                        <tr class="film-details__row film-details__row--release-date">
                                            <td class="film-details__term">Release Date</td>
                                            <td class="film-details__cell">${this.getReleaseDate()}</td>
                                        </tr>
                                        <tr class="film-details__row film-details__row--runtime">
                                            <td class="film-details__term">Runtime</td>
                                            <td class="film-details__cell">${this.getRuntime()}</td>
                                        </tr>
                                        <tr class="film-details__row film-details__row--country">
                                            <td class="film-details__term">Country</td>
                                            <td class="film-details__cell">${this.film.filmInfo.release.releaseCountry}</td>
                                        </tr>
                                        <tr class="film-details__row film-details__row--genres">
                                            <td class="film-details__term">${this.film.filmInfo.genre.length === 1 ? 'Genre' : 'Genres'}</td>
                                            <td class="film-details__cell">${this.getGenresMarkup()}</td>
                                        </tr>
                                    </table>
                                    <p class="film-details__film-description">${this.film.filmInfo.description}</p>
                                    </div>
                            </div>
                            <section class="film-details__controls">
                                <input type="checkbox" class="film-details__control-input film-details__control-input--watchlist visually-hidden" id="watchlist" name="watchlist"
                                    ${this.film.userDetails.watchlist ? 'checked' : ''}>
                                <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                                <input type="checkbox" class="film-details__control-input film-details__control-input--watched visually-hidden" id="watched" name="watched"
                                    ${this.film.userDetails.alreadyWatched ? 'checked' : ''}>
                                <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                                <input type="checkbox" class="film-details__control-input film-details__control-input--favorite visually-hidden" id="favorite" name="favorite"
                                    ${this.film.userDetails.favorite ? 'checked' : ''}>
                                <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                            </section>
                        </div>
                        <div class="film-details__bottom-container">
                            <section class="film-details__comments-wrap">
                                <h3 class="film-details__comments-title">
                                    Comments <span class="film-details__comments-count">${this.film.comments.length.toFixed(0)}</span>
                                </h3>
                                <ul class="film-details__comments-list">
                                </ul>
                                <div class="film-details__new-comment">
                                    <div class="film-details__add-emoji-label"></div>
                                    <label class="film-details__comment-label">
                                        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                                    </label>
                                    <div class="film-details__emoji-list">
                                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                                        <label class="film-details__emoji-label" for="emoji-smile">
                                                <img src="./img/emoji/smile.png" width="30" height="30" alt="emoji">
                                        </label>

                                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                                        <label class="film-details__emoji-label" for="emoji-sleeping">
                                            <img src="./img/emoji/sleeping.png" width="30" height="30" alt="emoji">
                                        </label>

                                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                                        <label class="film-details__emoji-label" for="emoji-puke">
                                            <img src="./img/emoji/puke.png" width="30" height="30" alt="emoji">
                                        </label>

                                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                                        <label class="film-details__emoji-label" for="emoji-angry">
                                            <img src="./img/emoji/angry.png" width="30" height="30" alt="emoji">
                                        </label>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </form>
                </section>`;
    }

    public createElement(): Element {
        return this.getTemplate();
    }

    public bind(): void {
        this.bindControlButtonsHandlers();
        this.bindPopupCloseHandlers();
        this.bindEmojiChangeHandlers();
        this.bindCommentFormSubmitKeyUpHandler();
    }

    public markWatchedButtonClickHandler(_: Event): void { }
    public watchlistButtonClickHandler(_: Event): void { }
    public favoritesButtonClickHandler(_: Event): void { }

    public updateComments(comments: Comment[]): void {
        const commentsList = this.element.querySelector('.film-details__comments-list');
        const commentElements = this.getCommentElements(comments);
        commentElements.forEach((comment) => {
            commentsList?.appendChild(comment);
        });
    }

    public getCommentFormElement(): HTMLFormElement {
        const formElement = this.element.querySelector('.film-details__inner');
        if (!(formElement instanceof HTMLFormElement)) {
            throw new Error('Comment form is not found.');
        }
        return formElement;
    }

    public getCommentText(): string {
        const commentInputElement = this.getCommentInputElement();
        return commentInputElement.value;
    }

    public getSelectedEmojiElement(): HTMLInputElement {
        const emojiElements = this.element.querySelectorAll('.film-details__emoji-item');
        const selectedEmojiElement = [...emojiElements].find((element) =>
            element instanceof HTMLInputElement && element.checked
        );

        if (!(selectedEmojiElement instanceof HTMLInputElement)) {
            throw new Error('Selected emoji element is not found.');
        }

        return selectedEmojiElement;
    }

    public resetCommentForm(): void {
        const commentInputElement = this.getCommentInputElement();
        const newCommentEmojiElement = this.getNewCommentEmojiElement();

        commentInputElement.value = '';
        newCommentEmojiElement.innerHTML = '';

        this.uncheckAllEmojiElements();
    }

    private getCommentInputElement(): HTMLTextAreaElement {
        const commentInputElement = this.element.querySelector('.film-details__new-comment textarea');
        if (!(commentInputElement instanceof HTMLTextAreaElement)) {
            throw new Error('Comment\'s text is not found.');
        }
        return commentInputElement;
    }

    private getNewCommentEmojiElement(): Element {
        const newCommentEmojiElement = this.element.querySelector('.film-details__add-emoji-label');
        if (!(newCommentEmojiElement)) {
            throw new Error('Comment\'s emotion is not found.');
        }
        return newCommentEmojiElement;
    }

    private uncheckAllEmojiElements(): void {
        const emojiElements = this.element.querySelectorAll('.film-details__emoji-item');
        emojiElements.forEach((element) => {
            if (element instanceof HTMLInputElement) {
                element.checked = false;
            }
        });
    }

    private bindControlButtonsHandlers(): void {
        const markWatchedButton = this.element.querySelector('.film-details__control-input--watched');
        const watchlistButton = this.element.querySelector('.film-details__control-input--watchlist');
        const favoritesButton = this.element.querySelector('.film-details__control-input--favorite');

        markWatchedButton?.addEventListener('click', (evt: Event) => this.markWatchedButtonClickHandler(evt));
        watchlistButton?.addEventListener('click', (evt: Event) => this.watchlistButtonClickHandler(evt));
        favoritesButton?.addEventListener('click', (evt: Event) => this.favoritesButtonClickHandler(evt));
    }

    private bindPopupCloseHandlers(): void {
        const closeButton = this.element.querySelector('.film-details__close-btn');
        if (closeButton instanceof HTMLElement) {
            closeButton.addEventListener('click', (evt: Event) => {
                evt.preventDefault();
                this.element.remove();
            });
            setTimeout(() => closeButton.focus(), 0);
        }

        this.element.addEventListener('keydown', ((evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                this.element.remove();
            }
        }) as EventListener);
    }

    private bindEmojiChangeHandlers(): void {
        const emojiElements = this.element.querySelectorAll('.film-details__emoji-item');
        emojiElements.forEach((element) => {
            element.addEventListener('change', (evt: Event) => this.emojiChangeHandler(evt));
        });
    }

    private emojiChangeHandler(evt: Event): void {
        if (evt.target instanceof HTMLInputElement) {
            const emojiItemId = evt.target.id;
            const emojiImage = this.element.querySelector(`[for="${emojiItemId}"] > img`);

            if (emojiImage && emojiImage instanceof HTMLImageElement) {
                const newCommentEmoji = this.element.querySelector('.film-details__add-emoji-label');
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
    }

    private bindCommentFormSubmitKeyUpHandler(): void {     //  TODO: Change the function name
        const commentFormElement = this.element.querySelector('.film-details__inner');
        const commentInputElement = this.element.querySelector('.film-details__new-comment textarea');

        if (!(commentFormElement instanceof HTMLFormElement)) {
            throw new Error('');        //  TODO: Add error's message
        }

        commentInputElement?.addEventListener('keyup', ((evt: KeyboardEvent) => {
            if (evt.key === 'Enter' && evt.ctrlKey) {
                evt.preventDefault();
                commentFormElement.requestSubmit();
            }
        }) as EventListener);
    }

    private getRuntime(): string {
        const MINUTES_IN_HOUR = 60;
        const runtimeInMinutes = this.film.filmInfo.runtime;

        if (runtimeInMinutes === 0) {
            return '0';
        } else if (runtimeInMinutes > 0 && runtimeInMinutes < MINUTES_IN_HOUR) {
            return `${runtimeInMinutes}m`;
        } else if (runtimeInMinutes >= MINUTES_IN_HOUR) {
            const hours = Math.floor(runtimeInMinutes / MINUTES_IN_HOUR);
            const minutes = runtimeInMinutes - hours * MINUTES_IN_HOUR;
            return `${hours}h ${minutes}m`;
        } else {
            throw new RangeError('Film\'s runtime should be positive.');
        }
    }

    private getReleaseDate(): string {
        const releaseDate = this.film.filmInfo.release.date;
        const day = releaseDate.getDate().toString().padStart(2, '0');
        const monthName = releaseDate.toLocaleDateString('default', { month: 'long' });
        const year = releaseDate.getFullYear();
        return `${day} ${monthName} ${year}`;
    }

    private getGenresMarkup(): string {
        return this.film.filmInfo.genre.map((genre) =>
            `<span class="film-details__genre">${genre}</span>`).join('').toString();
    }

    private getCommentElements(comments: Comment[]): Element[] {
        return comments.map((comment) => new FilmDetailsCommentView(comment).element);
    }
}
