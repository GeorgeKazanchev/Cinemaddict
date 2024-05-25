import View from '../../../interfaces/view';

export default class FilmDetailsCommentDeleteView implements View {
    constructor(content: string = 'Delete') {
        this.content = content;
    }

    content: string;

    getTemplate(): Node {
        const template = document.createElement('button');
        template.classList.add('film-details__comment-delete');
        template.type = 'submit';
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.content;
        return element;
    }
}