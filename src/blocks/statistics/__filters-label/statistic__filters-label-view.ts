class StatisticsFiltersLabelView implements View {
    constructor(label: string, targetId: string) {
        this.label = label;
        this.targetId = targetId;
    }

    label: string;
    targetId: string;

    getTemplate(): Node {
        const template = document.createElement('label');
        template.classList.add('statistic__filters-label');
        return template;
    }

    getElement(): Node {
        const element = document.createElement('label');
        element.classList.add('statistic__filters-label');
        element.textContent = this.label;
        element.setAttribute('for', this.targetId);
        return element;
    }
}