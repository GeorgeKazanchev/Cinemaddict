import View from '../../../interfaces/view';

export default class FilmDetailsInfoView implements View {
    constructor(head: Node, table: Node, filmDescription: Node) {
        this.head = head;
        this.table = table;
        this.filmDescription = filmDescription;
    }

    head: Node;
    table: Node;
    filmDescription: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__info');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.head);
        element.appendChild(this.table);
        element.appendChild(this.filmDescription);
        return element;
    }
}