class StatisticsView implements View {
    constructor(rank: Node, filters: Node, textList: Node, chart: Node) {
        this.rank = rank;
        this.filters = filters;
        this.textList = textList;
        this.chart = chart;
    }

    rank: Node;
    filters: Node;
    textList: Node;
    chart: Node;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('statistic');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.rank);
        element.appendChild(this.filters);
        element.appendChild(this.textList);
        element.appendChild(this.chart);
        return element;
    }
}