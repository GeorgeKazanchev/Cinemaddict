import getFormattedCommentDate from '../../model/get-formatted-comment-date';
import AbstractView from '../abstract-view';
import type Comment from '../../model/types/comment';
import type Emotion from '../../model/types/emotion';

type Props = {
  comment: Comment;
};

export default class CommentCardView extends AbstractView {
  constructor({ comment }: Props) {
    super();
    this._author = comment.author;
    this._date = comment.date;
    this._emotion = comment.emotion;
    this._text = comment.text;
  }

  private _author: string;
  private _date: Date;
  private _emotion: Emotion;
  private _text: string;

  public get template(): string {
    const author = this._author;
    const date = this._date;
    const emotion = this._emotion;
    const text = this._text;

    return `
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
  }
}
