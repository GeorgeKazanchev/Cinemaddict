class StatisticsTextItemView implements View {
    constructor(title: Node, text: Node) {
        this.title = title;
        this.text = text;
    }

    title: Node;
    text: Node;

    getTemplate(): Node {
        const template = document.createElement('li');
        template.classList.add('statistic__text-item');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.title);
        element.appendChild(this.text);
        return element;
    }
}