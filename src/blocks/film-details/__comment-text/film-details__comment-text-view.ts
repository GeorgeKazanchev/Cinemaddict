import View from '../../../interfaces/view';

export default class FilmDetailsCommentTextView implements View {
    constructor(text: string) {
        this.text = text;
    }

    text: string;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-details__comment-text');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.text;
        return element;
    }
}