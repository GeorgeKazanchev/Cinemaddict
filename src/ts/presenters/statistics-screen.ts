import ModelData from '../models-data/model-data';
import Model from '../models/model';
import HeaderPresenter from '../../blocks/header/header-presenter';
import MainStatisticsPresenter from '../../blocks/main/main-statistics-presenter';
import FooterPresenter from '../../blocks/footer/footer-presenter';
import { getMinDate } from '../utils';

export default class StatisticsScreen {
    constructor(data: ModelData) {
        const model = new Model(data);
        model.updateUserData();
        model.updateStatisticsData(getMinDate());

        this.headerPresenter = new HeaderPresenter(model, model.isAuthorized, model.userData);
        this.mainPresenter = new MainStatisticsPresenter(model, model.userData);
        this.footerPresenter = new FooterPresenter(model, model.allFilmsCount);
    }

    private headerPresenter: HeaderPresenter;
    private mainPresenter: MainStatisticsPresenter;
    private footerPresenter: FooterPresenter;

    public render(): void {
        document.body.innerHTML = '';
        this.headerPresenter.render(document.body);
        this.mainPresenter.render(document.body);
        this.footerPresenter.render(document.body);
    }
}
