class StatisticsItemTextView implements View {
    constructor(text: Node) {
        this.text = text;
    }

    text: Node;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('statistic__item-text');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.text);
        return element;
    }
}