import ModelData from '../models-data/model-data';
import Model from '../models/model';
import HeaderView from '../../blocks/header/header-view';
import MainFilmsView from '../../blocks/main/main-films-view';
import FooterView from '../../blocks/footer/footer-view';

export default class FilmsScreen {
    constructor(data: ModelData) {
        this.model = new Model(data);
        this.headerView = new HeaderView(this.model);
        this.mainView = new MainFilmsView(this.model);
        this.footerView = new FooterView(this.model);
    }

    private model: Model;
    private headerView: HeaderView;
    private mainView: MainFilmsView;
    private footerView: FooterView;
    private isRendered: boolean = false;

    public render(): void {
        if (!this.isRendered) {
            document.body.insertAdjacentElement('afterbegin', this.headerView.element);
            this.headerView.element.insertAdjacentElement('afterend', this.mainView.element);
            this.mainView.element.insertAdjacentElement('afterend', this.footerView.element);
        }
    }
}
