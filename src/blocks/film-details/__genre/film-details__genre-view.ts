import View from '../../../interfaces/view';

export default class FilmDetailsGenreView implements View {
    constructor(genre: string) {
        this.genre = genre;
    }

    genre: string;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('film-details__genre');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.genre;
        return element;
    }
}