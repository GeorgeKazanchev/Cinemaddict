class StatisticsFiltersView implements View {
    constructor(description: Node, options: NodeList, action: string = 'https://echo.htmlacademy.ru/') {
        this.description = description;
        this.action = action;
        this.options = options;
    }

    description: Node;
    options: NodeList;
    action: string;

    getTemplate(): Node {
        const template = document.createElement('form');
        template.classList.add('statistic__filters');
        template.method = 'get';
        template.action = this.action;
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.description);
        this.options.forEach((node) => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}