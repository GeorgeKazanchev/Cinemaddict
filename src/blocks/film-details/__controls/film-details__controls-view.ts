import View from '../../../interfaces/view';

export default class FilmDetailsControlsView implements View {
    constructor(controls: NodeList) {
        this.controls = controls;
    }

    controls: NodeList;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('film-details__controls');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.controls.forEach((node) => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}