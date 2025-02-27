import AbstractView from '../abstract-view';
import { Comment, getFormattedCommentDate } from '../model';
import Model from '../model/model';

type Props = {
  commentId: string;
  model: Model;
};

export default class CommentCardView extends AbstractView {
  constructor({ model, commentId }: Props) {
    super();
    this._model = model;
    this._commentId = commentId;
  }

  private _model: Model;
  private _commentId: string;

  public get commentId(): string {
    return this._commentId;
  }

  public get template(): string {
    const comment = this._model.getCommentById(this._commentId);
    const {
      author, date, emotion, text,
    } = comment;

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
    const comment = this._model.getCommentById(this._commentId);

    const deleteButtonElement = this.element.querySelector('.film-details__comment-delete');

    const deleteClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onCommentDelete(comment);
    };

    deleteButtonElement?.addEventListener('click', deleteClickHandler);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onCommentDelete(comment: Comment): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
