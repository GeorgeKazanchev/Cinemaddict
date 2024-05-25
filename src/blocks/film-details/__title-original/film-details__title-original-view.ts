import View from '../../../interfaces/view';

export default class FilmDetailsTitleOriginalView implements View {
    constructor(title: string) {
        this.title = title;
    }

    title: string;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-details__title-original');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.title;
        return element;
    }
}