import View from '../../../interfaces/view';

export default class SortButtonView implements View {
    constructor(content: string, href: string, isActive: boolean) {
        this.content = content;
        this.href = href;
        this.isActive = isActive;
    }

    content: string;
    href: string;
    isActive: boolean;

    getTemplate(): Node {
        const template = document.createElement('a');
        template.classList.add('sort__button');
        template.href = '#';
        return template;
    }

    getElement(): Node {
        const element = document.createElement('a');
        element.className = 'sort__button' + `${this.isActive ? ' sort__button--active' : ''}`;
        element.href = this.href;
        element.textContent = this.content;
        return element;
    }
}