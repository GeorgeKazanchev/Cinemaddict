import View from '../../../interfaces/view';

export default class FilmDetailsEmojiItemView implements View {
    constructor(name: string, id: string, value: string, type: string = 'radio',
        isHidden: boolean = true) {
        this.name = name;
        this.id = id;
        this.value = value;
        this.type = type;
        this.isHidden = isHidden;
    }

    name: string;
    id: string;
    value: string;
    type: string;
    isHidden: boolean;

    getTemplate(): Node {
        const template = this.getInputTemplate();
        return template;
    }

    getElement(): Node {
        const element = this.getInputTemplate();
        element.name = this.name;
        element.id = this.id;
        element.value = this.value;
        return element;
    }

    private getInputTemplate(): HTMLInputElement {
        const template = document.createElement('input');
        template.className = 'film-details__emoji-item' + `${this.isHidden ? ' visually-hidden' : ''}`;
        template.type = this.type;
        return template;
    }
}