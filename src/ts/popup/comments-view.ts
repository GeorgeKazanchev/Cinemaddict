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

    this._commentCardViews = this._getCommentCardViews();
    this._bindCommentCardsListeners();
  }

  private _model: Model;
  private _filmId: string;
  private _commentCardViews: CommentCardView[];
  private _onCommentDelete: Handlers.CommentDeleteHandler;
  private _commentFormElement: HTMLFieldSetElement | null = null;
  private _commentTextElement: HTMLTextAreaElement | null = null;
  private _emotionContainerElement: Element | null = null;

  public get template(): string {
    const commentsCount = this._model.getCommentsCount(this._filmId);
    const commentsTemplate = this._getCommentsTemplate();

    return `
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments
          <span class="film-details__comments-count">${commentsCount}</span>
        </h3>

        ${commentsTemplate}

        <fieldset class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">Comment text:
            <textarea
              class="film-details__comment-input"
              name="comment"
              placeholder="Select reaction below and write comment here"
              required
              aria-required="true"
            ></textarea>
          </label>
          <button class="film-details__comment-submit button" type="submit">Submit</button>

          <div class="film-details__emoji-list">
            <input
              class="film-details__emoji-item visually-hidden"
              type="radio"
              id="emoji-smile"
              aria-labelledby="emoji-smile-label"
              name="comment-emoji"
              value="smile"
              required
              aria-required="true"
            >
            <label class="film-details__emoji-label" for="emoji-smile" id="emoji-smile-label">
              <picture>
                <source type="image/webp" srcset="./img/emoji/smile.webp">
                <img src="./img/emoji/smile.png" width="30" height="30" alt="Smiley emoji">
              </picture>
            </label>

            <input
              class="film-details__emoji-item visually-hidden"
              type="radio"
              id="emoji-sleeping"
              aria-labelledby="emoji-sleeping-label"
              name="comment-emoji"
              value="sleeping"
            >
            <label class="film-details__emoji-label" for="emoji-sleeping" id="emoji-sleeping-label">
              <picture>
                <source type="image/webp" srcset="./img/emoji/sleeping.webp">
                <img src="./img/emoji/sleeping.png" width="30" height="30" alt="Sleeping emoji">
              </picture>
            </label>

            <input
              class="film-details__emoji-item visually-hidden"
              type="radio"
              id="emoji-puke"
              aria-labelledby="emoji-puke-label"
              name="comment-emoji"
              value="puke"
            >
            <label class="film-details__emoji-label" for="emoji-puke" id="emoji-puke-label">
              <picture>
                <source type="image/webp" srcset="./img/emoji/puke.webp">
                <img src="./img/emoji/puke.png" width="30" height="30" alt="Puking emoji">
              </picture>
            </label>

            <input
              class="film-details__emoji-item visually-hidden"
              type="radio"
              id="emoji-angry"
              aria-labelledby="emoji-angry-label"
              name="comment-emoji"
              value="angry"
            >
            <label class="film-details__emoji-label" for="emoji-angry" id="emoji-angry-label">
              <picture>
                <source type="image/webp" srcset="./img/emoji/angry.webp">
                <img src="./img/emoji/angry.png" width="30" height="30" alt="Angry emoji">
              </picture>
            </label>
          </div>
        </fieldset>
      </section>`;
  }

  public get element(): Element {
    const element = this.createElementLazy();
    const containerElement = element.querySelector('.film-details__comments-list');

    if (containerElement) {
      this._commentCardViews.forEach((view) => {
        containerElement.append(view.element);
      });
    }

    return element;
  }

  public get commentFormElement(): HTMLFieldSetElement {
    if (this._commentFormElement) {
      return this._commentFormElement;
    }

    const element = this.element.querySelector('.film-details__new-comment');
    if (!(element instanceof HTMLFieldSetElement)) {
      throw new Error('No comment submit form found');
    }

    this._commentFormElement = element;
    return element;
  }

  public get commentTextElement(): HTMLTextAreaElement {
    if (this._commentTextElement) {
      return this._commentTextElement;
    }

    const element = this.element.querySelector('.film-details__comment-input');
    if (!(element instanceof HTMLTextAreaElement)) {
      throw new Error('No comment text field found');
    }

    this._commentTextElement = element;
    return element;
  }

  public get emotionContainerElement(): Element {
    if (this._emotionContainerElement) {
      return this._emotionContainerElement;
    }

    const element = this.element.querySelector('.film-details__add-emoji-label');
    if (!element) {
      throw new Error('No emoji container element found');
    }

    this._emotionContainerElement = element;
    return element;
  }

  public bind(): void {
    //  Изменение выбранной эмоции
    const newCommentContainerElement = this.element.querySelector('.film-details__new-comment');

    const emotionChangeHandler = (evt: Event): void => {
      const inputElement = getTargetAsElement(evt);
      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      this.emotionContainerElement.innerHTML = '';
      const emotionImageElement = this._getEmotionImageElement(inputElement.value);
      this.emotionContainerElement.append(emotionImageElement);
    };

    newCommentContainerElement?.addEventListener('change', emotionChangeHandler);

    //  Добавление обработчиков на поле ввода комментария
    const { commentTextElement } = this;

    const commentTextInputHandler = (): void => {
      commentTextElement.setCustomValidity('');
    };

    const commentValidationHandler = (): void => {
      if (commentTextElement.validity.valueMissing) {
        commentTextElement.setCustomValidity('Комментарий не может быть пустым!');
        return;
      }
      commentTextElement.setCustomValidity('');
    };

    commentTextElement.addEventListener('input', commentTextInputHandler);
    commentTextElement.addEventListener('invalid', commentValidationHandler);
  }

  public getNewCommentText(): string {
    return this.commentTextElement.value;
  }

  public getNewCommentEmotion(): string {
    const selectedEmotionElement = this.element.querySelector('.film-details__emoji-item:checked');
    return selectedEmotionElement instanceof HTMLInputElement ? selectedEmotionElement.value : '';
  }

  public updateShownComments(): void {
    this._commentCardViews = this._getCommentCardViews();
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

  public makeDeleteButtonEnabled(commentId: string, isEnabled: boolean): void {
    const commentCardView = this._commentCardViews.find((view) => view.commentId === commentId);
    commentCardView?.makeDeleteButtonEnabled(isEnabled);
  }

  public makeCommentFormEnabled(isEnabled: boolean): void {
    this.commentFormElement.disabled = !isEnabled;
  }

  public resetNewCommentText(): void {
    this.commentTextElement.value = '';
  }

  public resetNewCommentEmotion(): void {
    this.emotionContainerElement.innerHTML = '';
    const emotionInputElements = this.element.querySelectorAll('.film-details__emoji-item');
    emotionInputElements.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.checked = false; //  eslint-disable-line no-param-reassign
      }
    });
  }

  public shakeCommentForm(): void {
    // Здесь используется хак, чтобы форма могла "трястить" более одного раза
    this.commentFormElement.classList.remove('film-details__new-comment--error');
    // eslint-disable-next-line no-self-assign
    this.commentFormElement.scrollTop = this.commentFormElement.scrollTop;
    this.commentFormElement.classList.add('film-details__new-comment--error');
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

  private _getCommentCardViews(): CommentCardView[] {
    const comments = this._model.getComments(this._filmId);
    return comments
      .map((comment) => new CommentCardView({ model: this._model, commentId: comment.id }));
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
