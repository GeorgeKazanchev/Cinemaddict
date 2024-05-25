import View from '../../../interfaces/view';

export default class FilmDetailsCloseView implements View {
    constructor(closeButton: Node) {
        this.closeButton = closeButton;
    }

    closeButton: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__close');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.closeButton);
        return element;
    }
}