class FilmsListContainerView implements View {
    constructor(films: NodeList) {
        this.films = films;
    }

    films: NodeList;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('films-list__container');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.films.forEach(node => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}