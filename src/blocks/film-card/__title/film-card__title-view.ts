import View from '../../../interfaces/view';

export default class FilmCardTitleView implements View {
    constructor(title: string) {
        this.title = title;
    }

    title: string;

    getTemplate(): Node {
        const template = document.createElement('h3');
        template.classList.add('film-card__title');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.title;
        return element;
    }
}