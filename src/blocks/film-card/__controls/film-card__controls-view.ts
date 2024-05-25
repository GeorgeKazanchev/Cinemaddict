import View from '../../../interfaces/view';

export default class FilmCardControlsView implements View {
    constructor(controls: NodeList) {
        this.controls = controls;
    }

    controls: NodeList;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-card__controls');
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