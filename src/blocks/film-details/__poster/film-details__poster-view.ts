import View from '../../../interfaces/view';

export default class FilmDetailsPosterView implements View {
    constructor(image: Node, age: Node) {
        this.image = image;
        this.age = age;
    }

    image: Node;
    age: Node;

    getTemplate(): Node {
        const template = document.createElement('div');
        template.classList.add('film-details__poster');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.image);
        element.appendChild(this.age);
        return element;
    }
}