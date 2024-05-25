import View from '../../../interfaces/view';

export default class FilmDetailsTotalRatingView implements View {
    constructor(rating: number) {
        this.rating = rating;
    }

    rating: number;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-details__total-rating');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.rating.toString();
        return element;
    }
}