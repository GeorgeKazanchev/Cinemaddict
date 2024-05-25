import View from '../../interfaces/view';

export default class MainNavigationView implements View {
    constructor(navItems: Node, navAdditional: Node) {
        this.navItems = navItems;
        this.navAdditional = navAdditional;
    }

    navItems: Node;
    navAdditional: Node;

    getTemplate(): Node {
        const template = document.createElement('nav');
        template.classList.add('main-navigation');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.navItems);
        element.appendChild(this.navAdditional);
        return element;
    }
}