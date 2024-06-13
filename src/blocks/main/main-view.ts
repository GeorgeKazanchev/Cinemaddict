import AbstractView from '../../ts/abstract-view';
import Model from '../../ts/models/model';

export default abstract class MainView extends AbstractView {
    constructor(model: Model) {
        super();
        this.model = model;
    }

    model: Model;
    template: string =
        `<main class="main"></main>`;
}
