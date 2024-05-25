import View from '../../../interfaces/view';

export default class FilmDetailsCommentDayView implements View {
    constructor(date: string) {
        this.date = date;
    }

    date: string;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('film-details__comment-day');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.date;
        return element;
    }
}