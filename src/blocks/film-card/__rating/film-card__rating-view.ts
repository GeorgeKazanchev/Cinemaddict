class FilmCardRatingView implements View {
    constructor(rating: string) {
        this.rating = rating;
    }

    rating: string;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-card__rating');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.rating;
        return element;
    }
}