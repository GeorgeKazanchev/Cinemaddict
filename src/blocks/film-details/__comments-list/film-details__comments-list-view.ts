import View from '../../../interfaces/view';

export default class FilmDetailsCommentsListView implements View {
    constructor(comments: NodeList) {
        this.comments = comments;
    }

    comments: NodeList;

    getTemplate(): Node {
        const template = document.createElement('ul');
        template.classList.add('film-details__comments-list');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.comments.forEach((node) => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}