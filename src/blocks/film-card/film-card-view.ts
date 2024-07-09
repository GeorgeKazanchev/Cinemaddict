import AbstractView from '../../ts/abstract-view';
import Movie from '../../ts/types/movie';

const MIN_RATING: number = 0.0;
const MAX_RATING: number = 10.0;
const MAX_DESCRIPTION_LENGTH: number = 140;
const ELLIPSIS_CODE: number = 8230;
const CONTROLS_ITEM_ACTIVE_CLASSNAME: string = ' film-card__controls-item--active';

export default class FilmCardView extends AbstractView {
    constructor(film: Movie) {
        super();
        this.film = film;
    }

    film: Movie;

    public get template(): string {
        return `<article class="film-card">
                    <h3 class="film-card__title">${this.film.filmInfo.title}</h3>
                    <p class="film-card__rating">${this.getRating()}</p>
                    <p class="film-card__info">
                        <span class="film-card__year">${this.getYear()}</span>
                        <span class="film-card__duration">${this.getDuration()}</span>
                        <span class="film-card__genre">${this.getGenre()}</span>
                    </p>
                    <img src="${this.film.filmInfo.poster}" alt="${this.film.filmInfo.title}" class="film-card__poster">
                    <p class="film-card__description">${this.getDescription()}</p>
                    <a class="film-card__comments">${this.getCommentsCount()}</a>
                    <div class="film-card__controls">
                        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
                            ${this.film.userDetails.watchlist ? CONTROLS_ITEM_ACTIVE_CLASSNAME : ''}"
                            type="button">Add to watchlist</button>
                        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
                            ${this.film.userDetails.alreadyWatched ? CONTROLS_ITEM_ACTIVE_CLASSNAME : ''}"
                            type="button">Mark as watched</button>
                        <button class="film-card__controls-item button film-card__controls-item--favorite
                            ${this.film.userDetails.favorite ? CONTROLS_ITEM_ACTIVE_CLASSNAME : ''}"
                            type="button">Mark as favorite</button>
                    </div>
                </article>`;
    }

    public createElement(): Element {
        return this.getTemplate();
    }

    private getRating(): string {
        const totalRating = this.film.filmInfo.totalRating;
        if (totalRating < MIN_RATING || totalRating > MAX_RATING) {
            throw new RangeError('Film\'s rating is not in the correct range.');
        }
        return totalRating.toFixed(1);
    }

    private getYear(): string {
        const date = this.film.filmInfo.release.date;
        return date.getFullYear().toFixed(0);
    }

    private getDuration(): string {
        const runtimeInMinutes = this.film.filmInfo.runtime;
        if (runtimeInMinutes <= 0) {
            throw new RangeError('Film\'s runtime should be positive.');
        }

        const MINUTES_IN_HOUR = 60;
        const hours = Math.floor(runtimeInMinutes / MINUTES_IN_HOUR);
        const minutes = runtimeInMinutes - hours * MINUTES_IN_HOUR;

        let duration = '';
        if (hours >= 1) {
            duration += `${hours}h `;
        }
        duration += `${minutes}m`;

        return duration;
    }

    private getGenre(): string {
        const genres = this.film.filmInfo.genre;
        return genres.join(', ');
    }

    private getDescription(): string {
        const description = this.film.filmInfo.description;

        let resultDescription = '';
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            resultDescription += description.slice(0, MAX_DESCRIPTION_LENGTH - 1);
            resultDescription += String.fromCharCode(ELLIPSIS_CODE);
        } else {
            resultDescription += description;
        }

        return resultDescription;
    }

    private getCommentsCount(): string {
        const commentsCount = this.film.comments.length;
        return commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`;
    }
}
