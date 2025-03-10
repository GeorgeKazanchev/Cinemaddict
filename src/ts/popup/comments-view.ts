import he from 'he';
import AbstractView from '../abstract-view';
import { Handlers, getEmotionByName } from '../model';
import Model from '../model/model';
import { getElementFromTemplate, getTargetAsElement } from '../util';
import CommentCardView from './comment-card-view';

type Props = {
  filmId: string;
  model: Model;
  onCommentDelete: Handlers.CommentDeleteHandler,
};

export default class CommentsView extends AbstractView {
  constructor({ model, filmId, onCommentDelete }: Props) {
    super();
    this._model = model;
    this._filmId = filmId;
    this._onCommentDelete = onCommentDelete;

    const comments = this._model.getComments(this._filmId);
    this._commentCardViews = comments
      .map((comment) => new CommentCardView({ model: this._model, commentId: comment.id }));

    this._bindCommentCardsListeners();
  }

  private _model: Model;
  private _filmId: string;
  private _commentCardViews: CommentCardView[];
  private _onCommentDelete: Handlers.CommentDeleteHandler;

  public get template(): string {
    const commentsCount = this._model.getCommentsCount(this._filmId);
    const commentsTemplate = this._getCommentsTemplate();

    return `
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments
          <span class="film-details__comments-count">${commentsCount}</span>
        </h3>

        ${commentsTemplate}

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" required placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <button class="film-details__comment-submit button" type="submit">Submit</button>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" required type="radio" id="emoji-smile" value="smile">
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

  public bind(): void {
    const newCommentContainerElement = this.element.querySelector('.film-details__new-comment');
    const commentTextElement = this.element.querySelector('.film-details__comment-input');
    if (!(commentTextElement instanceof HTMLTextAreaElement)) {
      throw new Error('No comment text field found');
    }

    const emotionChangeHandler = (evt: Event) => {
      const inputElement = getTargetAsElement(evt);
      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      const emotionContainerElement = this.element.querySelector('.film-details__add-emoji-label');
      if (emotionContainerElement) {
        emotionContainerElement.innerHTML = '';
      }

      const emotionImageElement = this._getEmotionImageElement(inputElement.value);
      emotionContainerElement?.append(emotionImageElement);
    };

    const commentTextChangeHandler = () => {
      commentTextElement.value = he.encode(commentTextElement.value);
    };

    const commentTextInputHandler = () => {
      commentTextElement.setCustomValidity('');
    };

    const commentValidationHandler = () => {
      if (commentTextElement.validity.valueMissing) {
        commentTextElement.setCustomValidity('Комментарий не может быть пустым!');
        return;
      }
      commentTextElement.setCustomValidity('');
    };

    newCommentContainerElement?.addEventListener('change', emotionChangeHandler);
    commentTextElement.addEventListener('change', commentTextChangeHandler);
    commentTextElement.addEventListener('input', commentTextInputHandler);
    commentTextElement.addEventListener('invalid', commentValidationHandler);
  }

  public updateShownComments(): void {
    const comments = this._model.getComments(this._filmId);
    this._commentCardViews = comments
      .map((comment) => new CommentCardView({ model: this._model, commentId: comment.id }));
    this._bindCommentCardsListeners();
    this._updateCommentsContainer();
  }

  public updateCommentsCount(): void {
    const commentsCount = this._model.getComments(this._filmId).length;
    const commentsCountElement = this.element.querySelector('.film-details__comments-count');
    if (commentsCountElement) {
      commentsCountElement.textContent = commentsCount.toFixed(0);
    }
  }

  public deleteCommentCard(commentId: string): void {
    //  Удаляется только вьюшка комментария, сам комментарий из массива удаляется "снаружи"
    const cardIndex = this._commentCardViews.findIndex((view) => view.commentId === commentId);
    const commentCardView = this._commentCardViews[cardIndex];
    this._commentCardViews.splice(cardIndex, 1);

    if (commentCardView) {
      commentCardView.element.remove();
    }
  }

  public resetNewCommentText(): void {
    const commentTextElement = this.element.querySelector('.film-details__comment-input');
    if (commentTextElement instanceof HTMLTextAreaElement) {
      commentTextElement.value = '';
    }
  }

  public resetSelectedEmotion(): void {
    const emotionContainerElement = this.element.querySelector('.film-details__add-emoji-label');
    if (emotionContainerElement) {
      emotionContainerElement.innerHTML = '';
    }

    const emotionInputElements = this.element.querySelectorAll('.film-details__emoji-item');
    emotionInputElements.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.checked = false; //  eslint-disable-line no-param-reassign
      }
    });
  }

  private _updateCommentsContainer(): void {
    let commentsContainerElement = this.element.querySelector('.film-details__comments-list');
    commentsContainerElement?.remove();

    const commentsTitleElement = this.element.querySelector('.film-details__comments-title');
    if (!commentsTitleElement) {
      throw new Error('No comments title element found');
    }

    const commentsTemplate = this._getCommentsTemplate();
    commentsContainerElement = getElementFromTemplate(commentsTemplate);
    commentsTitleElement.after(commentsContainerElement);

    const areCommentsLoaded = this._model.commentsLoadingStates.get(this._filmId) === 'success';
    if (areCommentsLoaded) {
      this._commentCardViews.forEach((view) => {
        commentsContainerElement.append(view.element);
      });
    }
  }

  private _getCommentsTemplate(): string {
    const loadingState = this._model.commentsLoadingStates.get(this._filmId);
    switch (loadingState) {
      case 'pending':
        return `<p class="film-details__comments-list">Loading...</p>`;
      case 'error':
        return `<p class="film-details__comments-list">The comments are not loaded. Try again later</p>`;
      case 'success':
        return `<ul class="film-details__comments-list"></ul>`;
      default:
        throw new Error('An incorrect comments loading state is obtained');
    }
  }

  private _getEmotionImageElement(emotionName: string): Element {
    const { imgSrc } = getEmotionByName(emotionName);
    const template = `<img src="${imgSrc}" width="55" height="55" alt="emoji-${emotionName}">`;
    return getElementFromTemplate(template);
  }

  private _bindCommentCardsListeners(): void {
    this._commentCardViews.forEach((view) => {
      view.onCommentDelete = this._onCommentDelete; //  eslint-disable-line no-param-reassign
    });
  }
}
