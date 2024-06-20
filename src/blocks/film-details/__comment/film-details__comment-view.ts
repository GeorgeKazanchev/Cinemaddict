import AbstractView from '../../../ts/abstract-view';
import Comment from '../../../ts/types/comment';
import Emotion from '../../../ts/types/emotion';
import EmotionImage from '../../../ts/types/emotion-image';

export default class FilmDetailsCommentView extends AbstractView {
    constructor(comment: Comment) {
        super();
        this.comment = comment;
    }

    comment: Comment;
    template: string =
        `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
                <img src="" alt="" width="55" height="55">
            </span>
            <div>
              <p class="film-details__comment-text"></p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author"></span>
                <span class="film-details__comment-day"></span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
        </li>`;

    createElement(): Element {
        const element = this.getTemplate();
        this.setCommentEmoji(element);
        this.setCommentText(element);
        this.setCommentInfo(element);
        return element;
    }

    private setCommentEmoji(element: Element): void {
        const imageElement = element.querySelector('.film-details__comment-emoji > img');
        if (imageElement && imageElement instanceof HTMLImageElement) {
            imageElement.src = this.getEmotionImageSrc(this.comment.emotion);
            imageElement.alt = this.comment.emotion;
        }
    }

    private setCommentText(element: Element): void {
        const textElement = element.querySelector('.film-details__comment-text');
        if (textElement) {
            textElement.textContent = this.comment.comment;
        }
    }

    private setCommentInfo(element: Element): void {
        const infoElement = element.querySelector('.film-details__comment-info');
        if (infoElement) {
            this.setAuthor(infoElement);
            this.setDate(infoElement);
        }
    }

    private setAuthor(element: Element): void {
        const authorElement = element.querySelector('.film-details__comment-author');
        if (authorElement) {
            authorElement.textContent = this.comment.author;
        }
    }

    private setDate(element: Element): void {
        const dateElement = element.querySelector('.film-details__comment-day');
        if (dateElement) {
            const date = new Date(this.comment.date);

            const year = date.getFullYear().toString().padStart(4, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            dateElement.textContent = `${year}/${month}/${day} ${hours}:${minutes}`;
        }
    }

    private getEmotionImageSrc(emotion: Emotion): EmotionImage {
        switch (emotion) {
            case Emotion.Smile: {
                return EmotionImage.Smile;
            }
            case Emotion.Sleeping: {
                return EmotionImage.Sleeping;
            }
            case Emotion.Puke: {
                return EmotionImage.Puke;
            }
            case Emotion.Angry: {
                return EmotionImage.Angry;
            }
        }
    }
}
