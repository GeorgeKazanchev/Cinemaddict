import View from '../../../interfaces/view';

export default class FilmDetailsAddEmojiLabelView implements View {
    constructor(content?: Node) {
        if (content !== undefined) {
            this.content = content;
        }
    }

    content?: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__add-emoji-label');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        if (this.content) {
            element.appendChild(this.content);
        }
        return element;
    }
}