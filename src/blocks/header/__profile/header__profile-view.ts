import View from '../../../interfaces/view';

export default class HeaderProfileView implements View {
    constructor(ratingNode: Node, avatarNode: Node) {
        this.ratingNode = ratingNode;
        this.avatarNode = avatarNode;
    }

    ratingNode: Node;
    avatarNode: Node;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('profile');
        template.classList.add('header__profile');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.ratingNode);
        element.appendChild(this.avatarNode);
        return element;
    }
}