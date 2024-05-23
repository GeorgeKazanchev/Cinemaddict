class MainNavigationItemsView implements View {
    constructor(items: NodeList) {
        this.items = items;
    }

    items: NodeList;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('main-navigation__items');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.items.forEach(node => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}