import View from '../../interfaces/view';

export default class SortView implements View {
    constructor(listItems: NodeList) {
        this.listItems = listItems;
    }

    listItems: NodeList;

    getTemplate(): Node {
        const template = document.createElement('ul');
        template.classList.add('sort');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.listItems.forEach((node) => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}