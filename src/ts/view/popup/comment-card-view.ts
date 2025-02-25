import getFormattedCommentDate from '../../model/get-formatted-comment-date';
import AbstractView from '../abstract-view';
import type Comment from '../../model/types/comment';

type Props = {
  comment: Comment;
};

export default class CommentCardView extends AbstractView {
  constructor({ comment }: Props) {
    super();
    this._comment = comment;
  }

  private _comment: Comment;

  public get commentId(): string {
    return this._comment.id;
  }

  public get template(): string {
    const {
      author, date, emotion, text,
    } = this._comment;

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
            <button class="film-details__comment-delete button" type="button">Delete</button>
          </p>
        </div>
      </li>`;
  }

  public bind(): void {
    const deleteButtonElement = this.element.querySelector('.film-details__comment-delete');

    const deleteClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onCommentDelete(this._comment);
    };

    deleteButtonElement?.addEventListener('click', deleteClickHandler);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onCommentDelete(comment: Comment): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
