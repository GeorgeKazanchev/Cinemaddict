import View from '../../../interfaces/view';

export default class FilmDetailsCommentView implements View {
    constructor(emoji: Node, content: Node) {
        this.emoji = emoji;
        this.content = content;
    }

    emoji: Node;
    content: Node;

    getTemplate(): Node {
        const template = document.createElement('li');
        template.classList.add('film-details__comment');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.emoji);
        element.appendChild(this.content);
        return element;
    }
}