import View from '../../../interfaces/view';

export default class MainNavigationAdditionalView implements View {
    constructor(content: Node, href: string, isActive: boolean) {
        this.content = content;
        this.href = href;
        this.isActive = isActive;
    }

    content: Node;
    href: string;
    isActive: boolean;

    getTemplate(): Node {
        const template = document.createElement('a');
        template.classList.add('main-navigation__additional');
        return template;
    }

    getElement(): Node {
        const element = document.createElement('a');
        element.className = 'main-navigation__additional' + `${this.isActive ? ' main-navigation__additional--active' : ''}`;
        element.href = this.href;
        element.appendChild(this.content.cloneNode(true));
        return element;
    }
}