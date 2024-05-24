class FooterView implements View {
    constructor(logo: Node, statistics: Node) {
        this.logo = logo;
        this.statistics = statistics;
    }

    logo: Node;
    statistics: Node;

    getTemplate(): Node {
        const template = document.createElement('footer');
        template.classList.add('footer');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.logo);
        element.appendChild(this.statistics);
        return element;
    }
}