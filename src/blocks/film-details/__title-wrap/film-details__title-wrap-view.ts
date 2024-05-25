import View from '../../../interfaces/view';

export default class FilmDetailsTitleWrapView implements View {
    constructor(title: Node, titleOriginal: Node) {
        this.title = title;
        this.titleOriginal = titleOriginal;
    }

    title: Node;
    titleOriginal: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__title-wrap');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.title);
        element.appendChild(this.titleOriginal);
        return element;
    }
}