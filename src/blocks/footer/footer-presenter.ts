import Model from '../../ts/models/model';
import FooterView from './footer-view';

export default class FooterPresenter {
    constructor(model: Model, filmsCount: number) {
        this.model = model;
        this.view = new FooterView(filmsCount);
    }

    private model: Model;
    private view: FooterView;

    public get element(): Element {
        return Object.freeze(this.view.element);
    }

    public render(element: Element): void {
        element.appendChild(this.view.element);
    }
}
