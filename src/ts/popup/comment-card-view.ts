import moment from 'moment';
import AbstractView from '../abstract-view';
import { Comment } from '../model';
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
    const {
      author, date, emotion, text,
    } = this._model.getCommentById(this._commentId);

    return `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${emotion.imgSrc}" width="55" height="55" alt="emoji-${emotion.type.toLowerCase()}">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${moment(date).fromNow()}</span>
            <button class="film-details__comment-delete button" type="button">Delete</button>
          </p>
        </div>
      </li>`;
  }

  public get deleteButtonElement(): HTMLButtonElement {
    const element = this.element.querySelector('.film-details__comment-delete');
    if (!(element instanceof HTMLButtonElement)) {
      throw new Error('No delete button found');
    }
    return element;
  }

  public bind(): void {
    const comment = this._model.getCommentById(this._commentId);

    const deleteClickHandler = (evt: Event): void => {
      evt.preventDefault();
      this.onCommentDelete(comment);
    };

    this.deleteButtonElement.addEventListener('click', deleteClickHandler);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onCommentDelete(comment: Comment): void { }

  public makeDeleteButtonEnabled(isEnabled: boolean): void {
    this.deleteButtonElement.textContent = isEnabled ? 'Delete' : 'Deleting...';
    this.deleteButtonElement.disabled = !isEnabled;
  }
}
