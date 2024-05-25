import View from '../../../interfaces/view';

export default class FilmDetailsBottomContainerView implements View {
    constructor(comments: Node) {
        this.comments = comments;
    }

    comments: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__bottom-container');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.comments);
        return element;
    }
}