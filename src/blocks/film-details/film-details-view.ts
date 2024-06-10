import AbstractView from '../../types/abstract-view';
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
                                <tr class="film-details__row">
                                    <td class="film-details__term">Director</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Writers</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Actors</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Release Date</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Runtime</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Country</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Genres</td>
                                    <td class="film-details__cell"></td>
                                </tr>
                            </table>
                            <p class="film-details__film-description"></p>
                        </div>
                    </div>
                    <section class="film-details__controls">
                        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
                        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
                        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                    </section>
                </div>
                <div class="film-details__bottom-container">

                </div>
            </form>
        </section>`;

    getElement(): Element {
        const element = this.getTemplate();

        return element;
    }
}
