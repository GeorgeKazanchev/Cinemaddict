import View from '../../../interfaces/view';

export default class FilmDetailsFilmDescriptionView implements View {
    constructor(description: string) {
        this.description = description;
    }

    description: string;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-details__film-description');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.description;
        return element;
    }
}