import View from '../../../interfaces/view';

export default class HeaderLogoView implements View {
    constructor(content: Node) {
        this.content = content;
    }

    content: Node;

    getTemplate(): Node {
        const template = document.createElement('h1');
        template.classList.add('logo');
        template.classList.add('header__logo');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.content);
        return element;
    }
}