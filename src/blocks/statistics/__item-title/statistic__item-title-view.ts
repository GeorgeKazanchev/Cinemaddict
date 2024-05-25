class StatisticsItemTitleView implements View {
    constructor(title: string) {
        this.title = title;
    }

    title: string;

    getTemplate(): Node {
        const template = document.createElement('h4');
        template.classList.add('statistic__item-title');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.title;
        return element;
    }
}