import View from '../../../interfaces/view';

export default class StatisticsChartWrapView implements View {
    constructor(chart: Node) {
        this.chart = chart;
    }

    chart: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('statistic__chart-wrap');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.chart);
        return element;
    }
}