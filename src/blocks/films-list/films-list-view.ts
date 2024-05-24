class FilmsListView implements View {
    constructor(title: Node, filmsContainer: Node, isExtra: boolean = false) {
        this.title = title;
        this.filmsContainer = filmsContainer;
        this.isExtra = isExtra;
    }

    title: Node;
    filmsContainer: Node;
    isExtra: boolean;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('films-list');
        return template;
    }

    getElement(): Node {
        const element = document.createElement('section');
        element.className = 'films-list' + `${this.isExtra ? ' films-list--extra' : ''}`;
        element.appendChild(this.title);
        element.appendChild(this.filmsContainer);
        return element;
    }
}