import View from '../../../interfaces/view';

export default class FilmCardYearView implements View {
    constructor(year: string) {
        this.year = year;
    }

    year: string;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('film-card__year');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.year;
        return element;
    }
}