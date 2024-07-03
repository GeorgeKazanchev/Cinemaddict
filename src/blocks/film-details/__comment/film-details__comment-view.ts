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

    public get template(): string {
        return `<li class="film-details__comment">
                    <span class="film-details__comment-emoji">
                        <img src="${this.getEmotionImageSrc(this.comment.emotion)}" alt="${this.comment.emotion}"
                            width="55" height="55">
                    </span>
                    <div>
                        <p class="film-details__comment-text">${this.comment.comment}</p>
                        <p class="film-details__comment-info">
                            <span class="film-details__comment-author">${this.comment.author}</span>
                            <span class="film-details__comment-day">${this.getDate()}</span>
                            <button class="film-details__comment-delete">Delete</button>
                        </p>
                    </div>
                </li>`;
    }

    public createElement(): Element {
        return this.getTemplate();
    }

    private getDate(): string {
        const date = new Date(this.comment.date);

        const year = date.getFullYear().toString().padStart(4, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}`;
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
