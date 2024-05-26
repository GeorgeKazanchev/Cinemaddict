import View from '../../../interfaces/view';

export default class FilmDetailsCommentLabelView implements View {
    constructor(input: Node) {
        this.input = input;
    }

    input: Node;

    getTemplate(): Node {
        const template = document.createElement('label');
        template.classList.add('film-details__comment-label');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.input);
        return element;
    }
}