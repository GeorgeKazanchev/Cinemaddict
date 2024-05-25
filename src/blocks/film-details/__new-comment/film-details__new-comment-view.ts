import View from '../../../interfaces/view';

export default class FilmDetailsNewCommentView implements View {
    constructor(addEmojiLabel: Node, commentContent: Node, emojiList: Node) {
        this.addEmojiLabel = addEmojiLabel;
        this.commentContent = commentContent;
        this.emojiList = emojiList;
    }

    addEmojiLabel: Node;
    commentContent: Node;
    emojiList: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__new-comment');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.addEmojiLabel);
        element.appendChild(this.commentContent);
        element.appendChild(this.emojiList);
        return element;
    }
}