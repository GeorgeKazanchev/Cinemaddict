class FilmsView implements View {
    constructor(filmsLists: NodeList) {
        this.filmsLists = filmsLists;
    }

    filmsLists: NodeList;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('films');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        this.filmsLists.forEach(node => {
            element.appendChild(node.cloneNode(true));
        });
        return element;
    }
}