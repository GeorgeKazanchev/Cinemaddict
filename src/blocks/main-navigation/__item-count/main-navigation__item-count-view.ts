class MainNavigationItemCountView implements View {
    constructor(count: number) {
        if (!Number.isInteger(count)) {
            throw new Error('Movies count should be integer.');
        }
        this.count = count;
    }

    count: number;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('main-navigation__item-count');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.textContent = this.count.toString();
        return element;
    }
}