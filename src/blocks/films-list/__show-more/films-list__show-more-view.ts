import View from '../../../interfaces/view';

export default class FilmsListShowMoreView implements View {
    constructor(content: string) {
        this.content = content;
    }

    content: string;

    getTemplate(): Node {
        const template = document.createElement('button');
        template.classList.add('films-list__show-more');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.content;
        return element;
    }
}