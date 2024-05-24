class FilmCardInfoView implements View {
    constructor(yearNode: Node, durationNode: Node, genreNode: Node) {
        this.yearNode = yearNode;
        this.durationNode = durationNode;
        this.genreNode = genreNode;
    }

    yearNode: Node;
    durationNode: Node;
    genreNode: Node;

    getTemplate(): Node {
        const template = document.createElement('p');
        template.classList.add('film-card__info');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.yearNode);
        element.appendChild(this.durationNode);
        element.appendChild(this.genreNode);
        return element;
    }
}