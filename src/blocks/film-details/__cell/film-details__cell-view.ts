import View from '../../../interfaces/view';

export default class FilmDetailsCellView implements View {
    constructor(content: Node) {
        this.content = content;
    }

    content: Node;

    getTemplate(): Node {
        const template = document.createElement('td');
        template.classList.add('film-details__cell');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.content);
        return element;
    }
}