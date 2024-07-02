import ModelData from '../models-data/model-data';
import Model from '../models/model';
import HeaderPresenter from '../../blocks/header/header-presenter';
import MainFilmsPresenter from '../../blocks/main/main-films-presenter';
import FooterPresenter from '../../blocks/footer/footer-presenter';

export default class FilmsScreen {
    constructor(data: ModelData) {
        const model = new Model(data);
        model.updateUserData();
        model.resetShownFilmsCount();

        this.headerPresenter = new HeaderPresenter(model, model.isAuthorized, model.userData);
        this.mainPresenter = new MainFilmsPresenter(model, model.selectedFiltrationCriterion, model.userData,
            model.shownFilms, model.selectedSortCriterion, model.allFilmsShown, this.updateUserRating.bind(this));
        this.footerPresenter = new FooterPresenter(model, model.allFilmsCount);
    }

    private headerPresenter: HeaderPresenter;
    private mainPresenter: MainFilmsPresenter;
    private footerPresenter: FooterPresenter;

    public render(): void {
        document.body.innerHTML = '';
        this.headerPresenter.render(document.body);
        this.mainPresenter.render(document.body);
        this.footerPresenter.render(document.body);
    }

    private updateUserRating(): void {
        this.headerPresenter.updateUserRating();
    }
}
