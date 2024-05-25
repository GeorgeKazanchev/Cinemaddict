import View from '../../../interfaces/view';

export default class FilmCardPosterView implements View {
    constructor(src: string, alt: string) {
        this.src = src;
        this.alt = alt;
    }

    src: string;
    alt: string;

    getTemplate(): Node {
        const template = document.createElement('img');
        template.classList.add('film-card__poster');
        template.src = '';
        template.alt = '';
        return template;
    }

    getElement(): Node {
        const element = document.createElement('img');
        element.classList.add('film-card__poster');
        element.src = this.src;
        element.alt = this.alt;
        return element;
    }
}