import getFormattedCommentDate from './model/get-formatted-comment-date';
import { getElementFromTemplate } from './util';
import type Comment from './model/types/comment';

type Props = {
  comment: Comment;
};

const getCommentCard = ({ comment }: Props): Element => {
  const {
    author,
    text,
    date,
    emotion,
  } = comment;

  const content = `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emotion.imgSrc}" width="55" height="55" alt="emoji-${emotion.type.toLowerCase()}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getFormattedCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;

  return getElementFromTemplate(content);
};

export default getCommentCard;
