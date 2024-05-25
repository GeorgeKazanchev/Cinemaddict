import View from '../../../interfaces/view';

export default class FilmCardDurationView implements View {
    constructor(duration: string) {
        this.duration = duration;
    }

    duration: string;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('film-card__duration');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.duration;
        return element;
    }
}