import View from '../../../interfaces/view';

export default class FilmDetailsEmojiListView implements View {
    constructor(items: NodeList) {
        this.items = items;
    }

    items: NodeList;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__emoji-list');
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