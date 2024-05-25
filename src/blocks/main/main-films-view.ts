class MainFilmsView extends MainView {
    constructor(mainNavigation: Node, sort: Node, films: Node, isLoading: boolean) {
        super(mainNavigation);
        this.sort = sort;
        this.films = films;
        this.isLoading = isLoading;
    }

    sort: Node;
    films: Node;
    isLoading: boolean;

    getElement(): Node {
        const element = this.getTemplate();
        if (this.isLoading) {
            element.appendChild(this.films);
        } else {
            element.appendChild(this.sort);
            element.appendChild(this.films);
        }
        return element;
    }
}