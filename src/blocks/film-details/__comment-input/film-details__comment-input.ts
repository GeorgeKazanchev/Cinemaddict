import View from '../../../interfaces/view';

export default class FilmDetailsCommentInputView implements View {
    constructor(name: string, placeholder?: string) {
        this.name = name;
        this.placeholder = placeholder;
    }

    name: string;
    placeholder?: string;

    getTemplate(): Node {
        const template = this.getTextareaTemplate();
        return template;
    }

    getElement(): Node {
        const element = this.getTextareaTemplate();
        element.name = this.name;
        if (this.placeholder) {
            element.placeholder = this.placeholder;
        }
        return element;
    }

    private getTextareaTemplate(): HTMLTextAreaElement {
        const template = document.createElement('textarea');
        template.classList.add('film-details__comment-input');
        return template;
    }
}