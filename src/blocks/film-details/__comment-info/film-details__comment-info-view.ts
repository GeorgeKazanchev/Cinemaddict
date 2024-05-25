import View from '../../../interfaces/view';

export default class FilmDetailsCommentInfoView implements View {
    constructor(author: Node, day: Node, deleteButton: Node) {
        this.author = author;
        this.day = day;
        this.deleteButton = deleteButton;
    }

    author: Node;
    day: Node;
    deleteButton: Node;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-details__comment-info');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.author);
        element.appendChild(this.day);
        element.appendChild(this.deleteButton);
        return element;
    }
}