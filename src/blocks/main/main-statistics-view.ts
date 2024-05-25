class MainStatisticsView extends MainView {
    constructor(mainNavigation: Node, statistics: Node) {
        super(mainNavigation);
        this.statistics = statistics;
    }

    statistics: Node;

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.statistics);
        return element;
    }
}