class StatisticsFiltersDescriptionView implements View {
    constructor(description: string) {
        this.description = description;
    }

    description: string;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('statistic__filters-description');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.description;
        return element;
    }
}