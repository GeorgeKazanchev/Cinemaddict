import View from '../../../interfaces/view';

export default class FilmDetailsTableView implements View {
    constructor(rows: NodeList) {
        this.rows = rows;
    }

    rows: NodeList;

    getTemplate(): Node {
        const template = document.createElement('table');
        template.classList.add('film-details__table');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.rows.forEach((node) => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}