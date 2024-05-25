import View from '../../../interfaces/view';

export default class FilmDetailsTermView implements View {
    constructor(content: string) {
        this.content = content;
    }

    content: string;

    getTemplate(): Node {
        const template = document.createElement('td');
        template.classList.add('film-details__term');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.content;
        return element;
    }
}