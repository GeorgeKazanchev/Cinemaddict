import View from '../../../interfaces/view';

export default class FilmDetailsCommentsCountView implements View {
    constructor(count: number) {
        this.count = count;
    }

    count: number;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('film-details__comments-count');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.count.toString();
        return element;
    }
}