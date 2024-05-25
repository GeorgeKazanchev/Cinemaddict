import View from '../../../interfaces/view';

export default class ProfileRatingView implements View {
    constructor(rating: string) {
        this.rating = rating;
    }

    rating: string;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('profile__rating');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.rating;
        return element;
    }
}