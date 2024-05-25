class StatisticsItemDescriptionView implements View {
    constructor(description: string) {
        this.description = description;
    }

    description: string;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('statistic__item-description');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.description;
        return element;
    }
}