import MainView from './main-view';
import SortView from '../sort/sort-view';
import MainNavigationView from '../main-navigation/main-navigation-view';
import FilmsView from '../films/films-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import UserData from '../../ts/types/user-data';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';

export default class MainFilmsView extends MainView {
    constructor(selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData, filmsSection: FilmsSection,
        selectedSortCriterion: SortCriterionType) {

        super(selectedFiltrationCriterion, userData);

        this.filmsSection = filmsSection;
        this.selectedSortCriterion = selectedSortCriterion;

        this.mainNavigationView = new MainNavigationView(this.selectedFiltrationCriterion, this.userData);
        this.filmsView = new FilmsView(this.filmsSection);
        this.sortView = null;
    }

    filmsSection: FilmsSection;
    selectedSortCriterion: SortCriterionType;
    mainNavigationView: MainNavigationView;
    filmsView: FilmsView;
    sortView: SortView | null;

    createElement(): Element {
        const element = this.getTemplate();
        element.appendChild(this.mainNavigationView.element);

        const needToRenderSortPanel = this.checkNeedToRenderSortPanel();
        if (needToRenderSortPanel) {
            this.sortView = new SortView(this.selectedSortCriterion);
            element.appendChild(this.sortView.element);
        }

        element.appendChild(this.filmsView.element);
        return element;
    }

    updateSelectedFiltrationCriterion(filtrationCriterion: FiltrationCriterionType): void {
        this.mainNavigationView.updateSelectedFiltrationCriterion(filtrationCriterion);
    }

    updateSelectedSortCriterion(sortCriterion: SortCriterionType): void {
        this.sortView?.updateSelectedSortCriterion(sortCriterion);
    }

    updateFilmsSection(filmsSection: FilmsSection): void {
        this.filmsView.updateFilmsSection(filmsSection);
    }

    private checkNeedToRenderSortPanel(): boolean {
        return !this.filmsSection.isEmpty;
    }
}
