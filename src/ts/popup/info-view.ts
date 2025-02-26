import AbstractView from '../abstract-view';

import {
  getFormattedDuration,
  getFormattedReleaseDate,
  getRatingClassname,
  FilmInfo,
} from '../model';

type Props = {
  filmInfo: FilmInfo;
};

export default class InfoView extends AbstractView {
  constructor({ filmInfo }: Props) {
    super();
    this._filmInfo = filmInfo;
  }

  private _filmInfo: FilmInfo;

  public get template(): string {
    const info = this._filmInfo;

    const genreCells = info.genres.map((genre) => (
      `<span class="film-details__genre">${genre}</span>`
    )).join('');

    return `
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${info.posterSrc}" alt="${info.title}">
          <p class="film-details__age">${info.ageRating.toFixed(0)}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${info.title}</h3>
              <p class="film-details__title-original">Original: ${info.alternativeTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="${getRatingClassname(info.rating, 'film-details__total-rating')}">${info.rating.toFixed(1)}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${info.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${info.writers.length === 1 ? 'Writer' : 'Writers'}</td>
              <td class="film-details__cell">${info.writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${info.actors.length === 1 ? 'Actor' : 'Actors'}</td>
              <td class="film-details__cell">${info.actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getFormattedReleaseDate(info.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getFormattedDuration(info.durationMinutes)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${info.release.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${info.genres.length === 1 ? 'Genre' : 'Genres'}</td>
              <td class="film-details__cell">
                ${genreCells}
              </td>
            </tr>
          </table>
          <p class="film-details__film-description">
            ${info.description}
          </p>
        </div>
      </div>`;
  }
}
