class MainNavigationItemView implements View {
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
        template.classList.add('main-navigation__item');
        return template;
    }

    getElement(): Node {
        const element = document.createElement('a');
        element.className = 'main-navigation__item' + `${this.isActive ? ' main-navigation__item--active' : ''}`;
        element.href = this.href;
        element.appendChild(this.content.cloneNode(true));
        return element;
    }
}