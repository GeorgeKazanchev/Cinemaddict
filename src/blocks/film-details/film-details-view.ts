import AbstractView from '../../types/abstract-view';
import FilmDetailsCommentView from './__comment/film-details__comment-view';
import Movie from '../../types/movie';

export default class FilmDetailsView extends AbstractView {
    constructor(film: Movie) {
        super();
        this.film = film;
    }

    film: Movie;
    template: string =
        `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
                <div class="film-details__top-container">
                    <div class="film-details__close">
                        <button class="film-details__close-btn" type="button">close</button>
                    </div>
                    <div class="film-details__info-wrap">
                        <div class="film-details__poster">
                            <img class="film-details__poster-img" src="" alt="">
                            <p class="film-details__age"></p>
                        </div>
                        <div class="film-details__info">
                            <div class="film-details__info-head">
                                <div class="film-details__title-wrap">
                                    <h3 class="film-details__title"></h3>
                                    <p class="film-details__title-original"></p>
                                </div>
                                <div class="film-details__rating">
                                    <p class="film-details__total-rating"></p>
                                </div>
                            </div>
                            <table class="film-details__table">
                                <tr class="film-details__row film-details__row--director">
                                    <td class="film-details__term">Director</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row film-details__row--writers">
                                    <td class="film-details__term">Writers</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row film-details__row--actors">
                                    <td class="film-details__term">Actors</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row film-details__row--release-date">
                                    <td class="film-details__term">Release Date</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row film-details__row--runtime">
                                    <td class="film-details__term">Runtime</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row film-details__row--country">
                                    <td class="film-details__term">Country</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row film-details__row--genres">
                                    <td class="film-details__term"></td>
                                    <td class="film-details__cell"></td>
                                </tr>
                            </table>
                            <p class="film-details__film-description"></p>
                        </div>
                    </div>
                    <section class="film-details__controls">
                        <input type="checkbox" class="film-details__control-input film-details__control-input--watchlist visually-hidden" id="watchlist" name="watchlist">
                        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                        <input type="checkbox" class="film-details__control-input film-details__control-input--watched visually-hidden" id="watched" name="watched">
                        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                        <input type="checkbox" class="film-details__control-input film-details__control-input--favorite visually-hidden" id="favorite" name="favorite">
                        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                    </section>
                </div>
                <div class="film-details__bottom-container">
                    <section class="film-details__comments-wrap">
                        <h3 class="film-details__comments-title">
                            Comments <span class="film-details__comments-count"></span>
                        </h3>
                        <ul class="film-details__comments-list"></ul>
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

    getElement(): Element {
        const element = this.getTemplate();
        this.setFilmInfo(element);
        this.setControls(element);
        this.setCommentsCount(element);
        this.setCommentsList(element);
        return element;
    }

    private setFilmInfo(element: Element): void {
        const infoWrapElement = element.querySelector('.film-details__info-wrap');
        if (infoWrapElement) {
            this.setPoster(infoWrapElement);
            this.setInfoHead(infoWrapElement);
            this.setInfoTable(infoWrapElement);
            this.setDescription(infoWrapElement);
        }
    }

    private setControls(element: Element): void {
        const controlsElement = element.querySelector('.film-details__controls');
        if (controlsElement) {
            const watchlistElement = controlsElement.querySelector('.film-details__control-input--watchlist');
            const isFilmInWatchlist = this.film.userDetails.watchlist;
            if (isFilmInWatchlist && watchlistElement && watchlistElement instanceof HTMLInputElement) {
                watchlistElement.checked = true;
            }

            const watchedElement = controlsElement.querySelector('.film-details__control-input--watched');
            const isFilmWatched = this.film.userDetails.alreadyWatched;
            if (isFilmWatched && watchedElement && watchedElement instanceof HTMLInputElement) {
                watchedElement.checked = true;
            }

            const favoriteElement = controlsElement.querySelector('.film-details__control-input--favorite');
            const isFavoriteFilm = this.film.userDetails.favorite;
            if (isFavoriteFilm && favoriteElement && favoriteElement instanceof HTMLInputElement) {
                favoriteElement.checked = true;
            }
        }
    }

    private setCommentsCount(element: Element): void {
        const commentsCountElement = element.querySelector('.film-details__comments-count');
        if (commentsCountElement) {
            commentsCountElement.textContent = this.film.comments.length.toFixed(0);
        }
    }

    private setCommentsList(element: Element): void {
        const commentsListElement = element.querySelector('.film-details__comments-list');
        if (commentsListElement) {
            this.film.comments.forEach((comment) => {
                const commentView = new FilmDetailsCommentView(comment);
                const commentElement = commentView.getElement();
                commentsListElement.appendChild(commentElement);
            });
        }
    }

    private setPoster(element: Element): void {
        const posterElement = element.querySelector('.film-details__poster');
        if (posterElement) {
            this.setPosterImage(posterElement);
            this.setAgeRating(posterElement);
        }
    }

    private setPosterImage(element: Element): void {
        const posterImageElement = element.querySelector('.film-details__poster-img');
        if (posterImageElement && posterImageElement instanceof HTMLImageElement) {
            posterImageElement.src = this.film.filmInfo.poster;
            posterImageElement.alt = this.film.filmInfo.title;
        }
    }

    private setAgeRating(element: Element): void {
        const ageRatingElement = element.querySelector('.film-details__age');
        if (ageRatingElement) {
            ageRatingElement.textContent = `${this.film.filmInfo.ageRating.toFixed(0)}+`;
        }
    }

    private setInfoHead(element: Element): void {
        const infoHeadElement = element.querySelector('.film-details__info-head');
        if (infoHeadElement) {
            this.setTitle(infoHeadElement);
            this.setTotalRating(infoHeadElement);
        }
    }

    private setTitle(element: Element): void {
        const titleWrapElement = element.querySelector('.film-details__title-wrap');
        if (titleWrapElement) {
            const titleElement = titleWrapElement.querySelector('.film-details__title');
            if (titleElement) {
                titleElement.textContent = this.film.filmInfo.title;
            }

            const originalTitleElement = titleWrapElement.querySelector('.film-details__title-original');
            if (originalTitleElement) {
                originalTitleElement.textContent = `Original: ${this.film.filmInfo.alternativeTitle}`;
            }
        }
    }

    private setTotalRating(element: Element): void {
        const ratingElement = element.querySelector('.film-details__total-rating');
        if (ratingElement) {
            ratingElement.textContent = this.film.filmInfo.totalRating.toFixed(1);
        }
    }

    private setInfoTable(element: Element): void {
        const tableElement = element.querySelector('.film-details__table');
        if (tableElement) {
            this.setDirector(tableElement);
            this.setWriters(tableElement);
            this.setActors(tableElement);
            this.setReleaseDate(tableElement);
            this.setRuntime(tableElement);
            this.setCountry(tableElement);
            this.setGenres(tableElement);
        }
    }

    private setDirector(element: Element): void {
        const directorElement = element.querySelector('.film-details__row--director');
        if (directorElement) {
            const directorContentElement = directorElement.querySelector('.film-details__cell');
            if (directorContentElement) {
                directorContentElement.textContent = this.film.filmInfo.director;
            }
        }
    }

    private setWriters(element: Element): void {
        const writersElement = element.querySelector('.film-details__row--writers');
        if (writersElement) {
            const writersContentElement = writersElement.querySelector('.film-details__cell');
            if (writersContentElement) {
                writersContentElement.textContent = this.film.filmInfo.writers.join(', ');
            }
        }
    }

    private setActors(element: Element): void {
        const actorsElement = element.querySelector('.film-details__row--actors');
        if (actorsElement) {
            const actorsContentElement = actorsElement.querySelector('.film-details__cell');
            if (actorsContentElement) {
                actorsContentElement.textContent = this.film.filmInfo.actors.join(', ');
            }
        }
    }

    private setReleaseDate(element: Element): void {
        const releaseDateElement = element.querySelector('.film-details__row--release-date');
        if (releaseDateElement) {
            const releaseDateContentElement = releaseDateElement.querySelector('.film-details__cell');
            if (releaseDateContentElement) {
                //  TODO: Add release date in the correct format
            }
        }
    }

    private setRuntime(element: Element): void {
        const runtimeElement = element.querySelector('.film-details__row--runtime');
        if (runtimeElement) {
            const runtimeContentElement = runtimeElement.querySelector('.film-details__cell');
            if (runtimeContentElement) {
                const runtimeTextContent = this.getRuntimeTextContent();
                runtimeContentElement.textContent = runtimeTextContent;
            }
        }
    }

    private setCountry(element: Element): void {
        const countryElement = element.querySelector('.film-details__row--country');
        if (countryElement) {
            const countryContentElement = countryElement.querySelector('.film-details__cell');
            if (countryContentElement) {
                countryContentElement.textContent = this.film.filmInfo.release.releaseCountry;
            }
        }
    }

    private setGenres(element: Element): void {
        const genres = this.film.filmInfo.genre;
        const genresElement = element.querySelector('.film-details__row--genres');
        if (genresElement) {
            const genresHeaderElement = genresElement.querySelector('.film-details__term');
            if (genresHeaderElement) {
                genresHeaderElement.textContent = genres.length === 1 ? 'Genre' : 'Genres';
            }

            const genresContentElement = genresElement.querySelector('.film-details__cell');
            if (genresContentElement) {
                genres.forEach((genre) => {
                    const genreElement = this.createGenreElement(genre);
                    genresContentElement.appendChild(genreElement);
                });
            }
        }
    }

    private setDescription(element: Element): void {
        const descriptionElement = element.querySelector('.film-details__film-description');
        if (descriptionElement) {
            descriptionElement.textContent = this.film.filmInfo.description;
        }
    }

    private getRuntimeTextContent(): string {
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

    private createGenreElement(genre: string): Element {
        const genreElement = document.createElement('span');
        genreElement.classList.add('film-details__genre');
        genreElement.textContent = genre;
        return genreElement;
    }
}
