import View from '../../../interfaces/view';

export default class FilmDetailsInfoWrapView implements View {
    constructor(poster: Node, info: Node) {
        this.poster = poster;
        this.info = info;
    }

    poster: Node;
    info: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__info-wrap');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.poster);
        element.appendChild(this.info);
        return element;
    }
}