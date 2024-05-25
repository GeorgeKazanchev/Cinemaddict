import View from '../../../interfaces/view';

export default class FilmDetailsTopContainerView implements View {
    constructor(closeButton: Node, info: Node, controls: Node) {
        this.closeButton = closeButton;
        this.info = info;
        this.controls = controls;
    }

    closeButton: Node;
    info: Node;
    controls: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__top-container');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.closeButton);
        element.appendChild(this.info);
        element.appendChild(this.controls);
        return element;
    }
}