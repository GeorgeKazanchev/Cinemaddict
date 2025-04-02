import AbstractView from '../abstract-view';
import {
  getElementFromTemplate,
  getTargetAsElement,
  loadElementLazy,
  shakeElement,
} from '../dom-util';
import { Handlers, getEmotionByName } from '../model';
import Model from '../model/model';
import CommentCardView from './comment-card-view';

const COMMENT_FORM_ERROR_CLASSNAME = 'film-details__new-comment--error';

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
  private _commentsCountElement: Element | null = null;
  private _commentTextElement: HTMLTextAreaElement | null = null;
  private _emotionContainerElement: Element | null = null;
  private _commentsTitleElement: Element | null = null;
  private _emotionInputElements: NodeListOf<Element> | null = null;

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
          <div class="film-details__new-comment-text-wrapper">
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
          </div>

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
    this._commentFormElement = loadElementLazy(
      this._commentFormElement,
      this.element,
      '.film-details__new-comment',
      'No comment submit form found',
    ) as HTMLFieldSetElement;
    return this._commentFormElement;
  }

  public get commentsCountElement(): Element {
    this._commentsCountElement = loadElementLazy(
      this._commentsCountElement,
      this.element,
      '.film-details__comments-count',
      'No comments count element found',
    );
    return this._commentsCountElement;
  }

  public get commentTextElement(): HTMLTextAreaElement {
    this._commentTextElement = loadElementLazy(
      this._commentTextElement,
      this.element,
      '.film-details__comment-input',
      'No comment text field found',
    ) as HTMLTextAreaElement;
    return this._commentTextElement;
  }

  public get emotionContainerElement(): Element {
    this._emotionContainerElement = loadElementLazy(
      this._emotionContainerElement,
      this.element,
      '.film-details__add-emoji-label',
      'No emotions container element found',
    );
    return this._emotionContainerElement;
  }

  public get commentsTitleElement(): Element {
    this._commentsTitleElement = loadElementLazy(
      this._commentsTitleElement,
      this.element,
      '.film-details__comments-title',
      'No comments title element found',
    );
    return this._commentsTitleElement;
  }

  public get emotionInputElements(): NodeListOf<Element> {
    if (this._emotionInputElements) {
      return this._emotionInputElements;
    }
    this._emotionInputElements = this.element.querySelectorAll('.film-details__emoji-item');
    return this._emotionInputElements;
  }

  public bind(): void {
    //  Изменение выбранной эмоции
    const emotionChangeHandler = (evt: Event): void => {
      const inputElement = getTargetAsElement(evt);
      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      this.emotionContainerElement.innerHTML = CommentsView
        ._getEmotionImageTemplate(inputElement.value);
    };

    this.commentFormElement.addEventListener('change', emotionChangeHandler);

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
    this.commentsCountElement.textContent = commentsCount.toFixed(0);
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
    this.emotionInputElements.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.checked = false; //  eslint-disable-line no-param-reassign
      }
    });
  }

  public shakeCommentForm(): void {
    shakeElement(this.commentFormElement, COMMENT_FORM_ERROR_CLASSNAME);
  }

  private _updateCommentsContainer(): void {
    this.element.querySelector('.film-details__comments-list')?.remove();

    const commentsTemplate = this._getCommentsTemplate();
    const commentsContainerElement = getElementFromTemplate(commentsTemplate);
    this.commentsTitleElement.after(commentsContainerElement);

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

  private _bindCommentCardsListeners(): void {
    this._commentCardViews.forEach((view) => {
      view.onCommentDelete = this._onCommentDelete; //  eslint-disable-line no-param-reassign
    });
  }

  private static _getEmotionImageTemplate(emotionName: string): string {
    const { imgSrc } = getEmotionByName(emotionName);
    return `<img src="${imgSrc}" width="55" height="55" alt="emoji-${emotionName}">`;
  }
}
