import View from '../../../interfaces/view';

export default class FooterLogoView implements View {
    constructor(content: Node) {
        this.content = content;
    }

    content: Node;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.className = 'footer__logo logo logo--smaller';
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.content);
        return element;
    }
}