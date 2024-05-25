import View from '../../../interfaces/view';

export default class FilmDetailsCommentsTitleView implements View {
    constructor(content: Node) {
        this.content = content;
    }

    content: Node;

    getTemplate(): Node {
        const template = document.createElement('h3');
        template.classList.add('film-details__comments-title');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.content);
        return element;
    }
}