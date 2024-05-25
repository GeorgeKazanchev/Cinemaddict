class StatisticsTextListView implements View {
    constructor(items: NodeList) {
        this.items = items;
    }

    items: NodeList;

    getTemplate(): Node {
        const template = document.createElement('ul');
        template.classList.add('statistic__text-list');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.items.forEach((node) => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}