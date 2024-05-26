import View from '../../../interfaces/view';

export default class StatisticsFiltersLabelView implements View {
    constructor(label: Node, targetId: string) {
        this.label = label;
        this.targetId = targetId;
    }

    label: Node;
    targetId: string;

    getTemplate(): Node {
        const template = this.getLabelTemplate();
        return template;
    }

    getElement(): Node {
        const element = this.getLabelTemplate();
        element.appendChild(this.label);
        element.htmlFor = this.targetId;
        return element;
    }

    private getLabelTemplate() {
        const template = document.createElement('label');
        template.classList.add('statistic__filters-label');
        return template;
    }
}