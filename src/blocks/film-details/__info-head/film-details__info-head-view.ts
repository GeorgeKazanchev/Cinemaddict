import View from '../../../interfaces/view';

export default class FilmDetailsInfoHeadView implements View {
    constructor(title: Node, rating: Node) {
        this.title = title;
        this.rating = rating;
    }

    title: Node;
    rating: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__info-head');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.title);
        element.appendChild(this.rating);
        return element;
    }
}