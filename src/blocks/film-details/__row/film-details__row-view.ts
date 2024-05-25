import View from '../../../interfaces/view';

export default class FilmDetailsRowView implements View {
    constructor(term: Node, cell: Node) {
        this.term = term;
        this.cell = cell;
    }

    term: Node;
    cell: Node;

    getTemplate(): Node {
        const template = document.createElement('tr');
        template.classList.add('film-details__row');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.term);
        element.appendChild(this.cell);
        return element;
    }
}