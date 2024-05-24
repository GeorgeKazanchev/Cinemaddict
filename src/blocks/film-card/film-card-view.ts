class FilmCardView implements View {
    constructor(title: Node, rating: Node, info: Node, poster: Node,
        description: Node, comments: Node, controls: Node) {
        this.title = title;
        this.rating = rating;
        this.info = info;
        this.poster = poster;
        this.description = description;
        this.comments = comments;
        this.controls = controls;
    }

    title: Node;
    rating: Node;
    info: Node;
    poster: Node;
    description: Node;
    comments: Node;
    controls: Node;

    getTemplate(): Node {
        const template = document.createElement('article');
        template.classList.add('film-card');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.title);
        element.appendChild(this.rating);
        element.appendChild(this.info);
        element.appendChild(this.poster);
        element.appendChild(this.description);
        element.appendChild(this.comments);
        element.appendChild(this.controls);
        return element;
    }
}