import View from '../../../interfaces/view';

export default class FilmDetailsInnerView implements View {
    constructor(topContainer: Node, bottomContainer: Node) {
        this.topContainer = topContainer;
        this.bottomContainer = bottomContainer;
    }

    topContainer: Node;
    bottomContainer: Node;

    getTemplate(): Node {
        const template = document.createElement('form');
        template.classList.add('film-details__inner');
        template.method = 'get';
        template.action = '';
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.topContainer);
        element.appendChild(this.bottomContainer);
        return element;
    }
}