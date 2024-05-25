import View from '../../../interfaces/view';

export default class FilmDetailsCommentsWrapView implements View {
    constructor(title: Node, commentsList: Node, newComment: Node) {
        this.title = title;
        this.commentsList = commentsList;
        this.newComment = newComment;
    }

    title: Node;
    commentsList: Node;
    newComment: Node;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('film-details__comments-wrap');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.title);
        element.appendChild(this.commentsList);
        element.appendChild(this.newComment);
        return element;
    }
}