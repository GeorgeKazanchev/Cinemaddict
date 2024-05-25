class StatisticsRankLabelView implements View {
    constructor(label: string) {
        this.label = label;
    }

    label: string;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('statistic__rank-label');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.label;
        return element;
    }
}