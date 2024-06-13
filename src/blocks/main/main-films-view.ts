import MainView from './main-view';
import SortView from '../sort/sort-view';
import MainNavigationView from '../main-navigation/main-navigation-view';
import FilmsView from '../films/films-view';
import Model from '../../ts/models/model';

export default class MainFilmsView extends MainView {
    constructor(model: Model) {
        super(model);
    }

    createElement(): Element {
        const element = this.getTemplate();

        const mainNavigationView = new MainNavigationView(this.model.selectedNavigationItem, this.model.userData);
        element.appendChild(mainNavigationView.element);

        const needToRenderSortPanel = this.checkNeedToRenderSortPanel();
        if (needToRenderSortPanel) {
            const sortView = new SortView(this.model.selectedSortCriterion);
            element.appendChild(sortView.element);
        }

        const filmsSectionView = new FilmsView(this.model.filmsSection);
        element.appendChild(filmsSectionView.element);
        return element;
    }

    private checkNeedToRenderSortPanel(): boolean {
        return !this.model.filmsSection.isEmpty;
    }
}
