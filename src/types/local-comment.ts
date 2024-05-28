import Emotion from './emotion';

export default class LocalComment {
    constructor(comment: string, date: string, emotion: Emotion) {
        this.comment = comment;
        this.date = date;
        this.emotion = emotion;
    }

    comment: string;
    date: string;
    emotion: Emotion;
}