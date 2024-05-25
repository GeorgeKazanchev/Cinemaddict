class StatisticsChartView implements View {
    constructor(width: number) {
        if (width <= 0) {
            throw new Error('Chart\'s width should be positive.');
        }

        this.width = width;
    }

    width: number;

    getTemplate(): Node {
        const template = document.createElement('canvas');
        template.classList.add('statistic__chart');
        return template;
    }

    getElement(): Node {
        const element = document.createElement('canvas');
        element.classList.add('statistic__chart');
        element.width = this.width;
        return element;
    }
}