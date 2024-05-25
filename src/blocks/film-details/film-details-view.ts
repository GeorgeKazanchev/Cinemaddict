import View from '../../interfaces/view';

export default class FilmDetailsView implements View {
    constructor(innerContent: Node) {
        this.innerContent = innerContent;
    }

    innerContent: Node;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('film-details');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.innerContent);
        return element;
    }
}