import getCommentCard from './comment-card';
import getFormattedDuration from './model/get-formatted-duration';
import getFormattedReleaseDate from './model/get-formatted-release-date';
import getRatingClassname from './model/get-rating-classname';
import { getElementFromTemplate } from './util';
import type Comment from './model/types/comment';
import type Film from './model/types/film';

type Props = {
  comments: Comment[];
  film: Film;
};

const getPopup = ({ film, comments }: Props): Element => {
  const { info, userDetails } = film;

  const genreCells = info.genres.map((genre) => (
    `<span class="film-details__genre">${genre}</span>`
  )).join('');

  const commentCards = comments.map((comment) => getCommentCard({ comment }));

  const infoWrapper = `
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

  const controls = `
    <section class="film-details__controls">
      <input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="watchlist"
        name="watchlist"
        ${userDetails.inWatchlist ? 'checked' : ''}
      >
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="watched"
        name="watched"
        ${userDetails.isWatched ? 'checked' : ''}
      >
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="favorite"
        name="favorite"
        ${userDetails.isFavorite ? 'checked' : ''}
      >
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`;

  const commentsWrapper = `
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments
        <span class="film-details__comments-count">${comments.length}</span>
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
    </section>`;

  const content = `
    <section class="film-details">
      <form class="film-details__inner" action="#" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${infoWrapper}
          ${controls}
        </div>
        <div class="film-details__bottom-container">
          ${commentsWrapper}
        </div>
      </form>
    </section>`;

  const element = getElementFromTemplate(content);
  const closeButtonElement = element.querySelector('.film-details__close-btn');

  element.querySelector('.film-details__comments-list')?.append(...commentCards);

  element.addEventListener('keydown', ((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      element.remove();
    }
  }) as EventListener);

  closeButtonElement?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    element.remove();
  });

  closeButtonElement?.addEventListener('keydown', ((evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      element.remove();
    }
  }) as EventListener);

  return element;
};

export default getPopup;
