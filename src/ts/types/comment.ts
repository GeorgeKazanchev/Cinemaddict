import Emotion from './emotion';

export default class Comment {
    constructor(id: string, author: string, comment: string, date: string, emotion: Emotion) {
        this.id = id;
        this.author = author;
        this.comment = comment;
        this.date = date;
        this.emotion = emotion;
    }

    id: string;
    author: string;
    comment: string;
    date: string;
    emotion: Emotion;
}