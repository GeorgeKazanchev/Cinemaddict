import MainView from './main-view';
import SortView from '../sort/sort-view';
import MainNavigationView from '../main-navigation/main-navigation-view';
import FilmsView from '../films/films-view';
import NavigationItem from '../../types/navigation-items/navigation-item';
import UserData from '../../types/user-data';
import FilmsSection from '../../types/films-sections/films-section';
import SortCriterionType from '../../types/sort-criterion-type';

export default class MainFilmsView extends MainView {
    constructor(selectedNavigationItem: NavigationItem, userData: UserData, filmsSection: FilmsSection,
        selectedSortCriterion: SortCriterionType) {
        super(selectedNavigationItem, userData);
        this.filmsSection = filmsSection;
        this.selectedSortCriterion = selectedSortCriterion;
    }

    filmsSection: FilmsSection;
    selectedSortCriterion: SortCriterionType;

    getElement(): Element {
        const element = this.getTemplate();

        const mainNavigationView = new MainNavigationView(this.selectedNavigationItem, this.userData);
        element.appendChild(mainNavigationView.getElement());

        const needToRenderSortPanel = this.checkNeedToRenderSortPanel();
        if (needToRenderSortPanel) {
            const sortView = new SortView(this.selectedSortCriterion);
            element.appendChild(sortView.getElement());
        }

        const filmsSectionView = new FilmsView(this.filmsSection);
        element.appendChild(filmsSectionView.getElement());
        return element;
    }

    private checkNeedToRenderSortPanel(): boolean {
        return !this.filmsSection.isEmpty;
    }
}
