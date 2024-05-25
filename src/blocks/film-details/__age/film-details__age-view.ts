import View from '../../../interfaces/view';

export default class FilmDetailsAgeView implements View {
    constructor(content: string) {
        this.content = content;
    }

    content: string;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-details__age');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.content;
        return element;
    }
}