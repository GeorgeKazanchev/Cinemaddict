import View from '../../../interfaces/view';

export default class FilmDetailsCommentAuthorView implements View {
    constructor(author: string) {
        this.author = author;
    }

    author: string;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('film-details__comment-author');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.author;
        return element;
    }
}