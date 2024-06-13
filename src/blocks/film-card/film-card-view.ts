import AbstractView from '../../ts/abstract-view';
import Movie from '../../ts/types/movie';

export default class FilmCardView extends AbstractView {
    constructor(movie: Movie) {
        super();
        this.film = movie;
    }

    static get MIN_RATING(): number { return 0.0; };
    static get MAX_RATING(): number { return 10.0; };
    static get MAX_DESCRIPTION_LENGTH(): number { return 140; };
    static get ELLIPSIS_CODE(): number { return 8230; };

    film: Movie;
    template: string =
        `<article class="film-card">
            <h3 class="film-card__title"></h3>
            <p class="film-card__rating"></p>
            <p class="film-card__info">
                <span class="film-card__year"></span>
                <span class="film-card__duration"></span>
                <span class="film-card__genre"></span>
            </p>
            <img src="" alt="" class="film-card__poster">
            <p class="film-card__description"></p>
            <a class="film-card__comments"></a>
            <div class="film-card__controls">
                <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
                <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
                <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
            </div>
        </article>`;

    getElement(): Element {
        const element = this.getTemplate();

        this.setTitle(element);
        this.setRating(element);
        this.setYear(element);
        this.setDuration(element);
        this.setGenre(element);
        this.setPoster(element);
        this.setDescription(element);
        this.setCommentsCount(element);
        this.setControls(element);

        return element;
    }

    private setTitle(element: Element): void {
        const titleElement = element.querySelector('.film-card__title');
        if (titleElement) titleElement.textContent = this.film.filmInfo.title;
    }

    private setRating(element: Element): void {
        const ratingElement = element.querySelector('.film-card__rating');
        if (ratingElement) ratingElement.textContent = this.getRating();
    }

    private setYear(element: Element): void {
        const yearElement = element.querySelector('.film-card__year');
        if (yearElement) yearElement.textContent = this.getYear();
    }

    private setDuration(element: Element): void {
        const durationElement = element.querySelector('.film-card__duration');
        if (durationElement) durationElement.textContent = this.getDuration();
    }

    private setGenre(element: Element): void {
        const genreElement = element.querySelector('.film-card__genre');
        if (genreElement) genreElement.textContent = this.getGenre();
    }

    private setPoster(element: Element): void {
        const posterElement = element.querySelector('.film-card__poster');
        if (posterElement && posterElement instanceof HTMLImageElement) {
            posterElement.src = this.film.filmInfo.poster;
            posterElement.alt = this.film.filmInfo.title;
        }
    }

    private setDescription(element: Element): void {
        const descriptionElement = element.querySelector('.film-card__description');
        if (descriptionElement) descriptionElement.textContent = this.getDescription();
    }

    private setCommentsCount(element: Element): void {
        const commentsElement = element.querySelector('.film-card__comments');
        if (commentsElement) commentsElement.textContent = this.getCommentsCount();
    }

    private setControls(element: Element): void {
        const userDetails = this.film.userDetails;
        const isInWatchlist = userDetails.watchlist;
        const isAlreadyWatched = userDetails.alreadyWatched;
        const isFavorite = userDetails.favorite;

        if (isInWatchlist) {
            const addToWatchlistButton = element.querySelector('.film-card__controls-item--add-to-watchlist');
            if (addToWatchlistButton) this.toggleButtonToActive(addToWatchlistButton);
        }

        if (isAlreadyWatched) {
            const markAsWatchedButton = element.querySelector('.film-card__controls-item--mark-as-watched');
            if (markAsWatchedButton) this.toggleButtonToActive(markAsWatchedButton);
        }

        if (isFavorite) {
            const favoriteButton = element.querySelector('.film-card__controls-item--favorite');
            if (favoriteButton) this.toggleButtonToActive(favoriteButton);
        }
    }

    private toggleButtonToActive(button: Element): void {
        button.classList.add('film-card__controls-item--active');
    }

    private getRating(): string {
        const totalRating = this.film.filmInfo.totalRating;
        if (totalRating < FilmCardView.MIN_RATING || totalRating > FilmCardView.MAX_RATING) {
            throw new RangeError('Film\'s rating is not in the correct range.');
        }
        return totalRating.toFixed(1);
    }

    private getYear(): string {
        const date = this.film.filmInfo.release.date;
        return date.split('-')[0];
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

    private getGenre() {
        const genres = this.film.filmInfo.genre;
        return genres.join(', ');
    }

    private getDescription() {
        const description = this.film.filmInfo.description;

        let resultDescription = '';
        if (description.length > FilmCardView.MAX_DESCRIPTION_LENGTH) {
            resultDescription += description.slice(0, FilmCardView.MAX_DESCRIPTION_LENGTH - 1);
            resultDescription += String.fromCharCode(FilmCardView.ELLIPSIS_CODE);
        } else {
            resultDescription += description;
        }

        return resultDescription;
    }

    private getCommentsCount() {
        const commentsCount = this.film.comments.length;
        return commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`;
    }
}
