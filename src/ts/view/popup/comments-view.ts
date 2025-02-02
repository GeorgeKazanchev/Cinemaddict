import AbstractView from '../abstract-view';
import CommentCardView from './comment-card-view';
import type Comment from '../../model/types/comment';

type Props = {
  comments: Comment[];
};

export default class CommentsView extends AbstractView {
  constructor({ comments }: Props) {
    super();
    this._comments = comments;
    this._commentCardViews = comments.map((comment) => new CommentCardView({ comment }));
  }

  private _comments: Comment[];
  private _commentCardViews: CommentCardView[];

  public get template(): string {
    return `
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments
          <span class="film-details__comments-count">${this._comments.length}</span>
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
  }

  public get element(): Element {
    const element = super.element;

    const commentsContainerElement = element.querySelector('.film-details__comments-list');

    if (commentsContainerElement && commentsContainerElement.children.length === 0) {
      this._commentCardViews.forEach((view) => {
        commentsContainerElement.append(view.element);
      });
    }

    return element;
  }
}
