import View from '../../../interfaces/view';

export default class FilmDetailsRatingView implements View {
    constructor(totalRating: Node) {
        this.totalRating = totalRating;
    }

    totalRating: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__rating');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.totalRating);
        return element;
    }
}