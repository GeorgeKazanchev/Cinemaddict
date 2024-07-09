import AbstractView from '../../ts/abstract-view';
import FilmDetailsCommentView from './__comment/film-details__comment-view';
import Movie from '../../ts/types/movie';

export default class FilmDetailsView extends AbstractView {
    constructor(film: Movie) {
        super();
        this.film = film;
    }

    film: Movie;

    public get template(): string {
        return `<section class="film-details">
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
                                    ${this.getCommentsMarkup()}
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

    private getCommentsMarkup(): string {
        return this.film.comments.map((comment) => {
            const commentView = new FilmDetailsCommentView(comment);
            return commentView.getMarkup();
        }).join('').toString();
    }
}
