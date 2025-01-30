import mocksComments from './data/mock-comments';
import getFormattedDuration from './model/get-formatted-duration';
import getLimitedDescription from './model/get-limited-description';
import getPopup from './popup';
import { getElementFromTemplate, getTargetAsElement } from './util';
import type Film from './model/types/film';

const BUTTON_ACTIVE_CLASSNAME = 'film-card__controls-item--active';

type Props = {
  film: Film;
};

const getFilmCard = ({ film }: Props): Element => {
  const { commentsIds, info, userDetails } = film;

  const commentsCount = commentsIds.length;

  const openPopup = (): void => {
    document.querySelector('.film-details')?.remove();

    const comments = mocksComments.filter((comment) => commentsIds.includes(comment.id));
    const popupElement = getPopup({ film, comments });
    document.body.append(popupElement);

    const popupCloseButtonElement = popupElement.querySelector('.film-details__close-btn');
    if (popupCloseButtonElement instanceof HTMLElement) {
      setTimeout(() => popupCloseButtonElement.focus(), 0);
    }
  };

  const content = `
    <article class="film-card">
      <h3 class="film-card__title">${info.title}</h3>
      <p class="film-card__rating">${info.rating.toFixed(1)}</p>
      <p class="film-card__info">
        <span class="film-card__year">${info.release.date.getFullYear()}</span>
        <span class="film-card__duration">${getFormattedDuration(info.durationMinutes)}</span>
        <span class="film-card__genre">${info.genres.join(', ')}</span>
      </p>
      <img src="${info.posterSrc}" alt="${info.title}" class="film-card__poster">
      <p class="film-card__description">${getLimitedDescription(info.description)}</p>
      <a class="link film-card__comments">${commentsCount} ${commentsCount === 1 ? 'comment' : 'comments'}</a>
      <div class="film-card__controls">
        <button
          class="film-card__controls-item button film-card__controls-item--add-to-watchlist
            ${userDetails.inWatchlist ? BUTTON_ACTIVE_CLASSNAME : ''}"
          type="button"
        >
          Add to watchlist
        </button>
        <button
          class="film-card__controls-item button film-card__controls-item--mark-as-watched
            ${userDetails.isWatched ? BUTTON_ACTIVE_CLASSNAME : ''}"
          type="button"
        >
          Mark as watched
        </button>
        <button
          class="film-card__controls-item button film-card__controls-item--favorite
            ${userDetails.isFavorite ? BUTTON_ACTIVE_CLASSNAME : ''}"
          type="button"
        >
          Mark as favorite
        </button>
      </div>
    </article>`;

  const element = getElementFromTemplate(content);

  element.addEventListener('click', (evt: Event) => {
    const target = getTargetAsElement(evt);

    const titleElement = target.closest('.film-card__title');
    const posterElement = target.closest('.film-card__poster');
    const commentsElement = target.closest('.film-card__comments');

    if (!titleElement && !posterElement && !commentsElement) {
      return;
    }

    evt.preventDefault();
    openPopup();
  });

  return element;
};

export default getFilmCard;
