import View from '../../../interfaces/view';

export default class FilmDetailsCloseBtnView implements View {
    constructor(content: string = 'close') {
        this.content = content;
    }

    content: string;

    getTemplate(): Node {
        const template = document.createElement('button');
        template.classList.add('film-details__close-btn');
        template.type = 'button';
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.content;
        return element;
    }
}