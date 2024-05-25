class StatisticsRankView implements View {
    constructor(image: Node, label: Node) {
        this.image = image;
        this.label = label;
    }

    image: Node;
    label: Node;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('statistic__rank');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(document.createTextNode('Your rank'));
        element.appendChild(this.image);
        element.appendChild(this.label);
        return element;
    }
}