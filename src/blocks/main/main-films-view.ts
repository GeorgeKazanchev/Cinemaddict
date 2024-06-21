import MainView from './main-view';
import SortView from '../sort/sort-view';
import MainNavigationView from '../main-navigation/main-navigation-view';
import FilmsView from '../films/films-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import FilledFilmsSection from '../../ts/types/films-sections/filled-films-section';
import UserData from '../../ts/types/user-data';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';
import Movie from '../../ts/types/movie';

export default class MainFilmsView extends MainView {
    constructor(selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData, films: Movie[] | null,
        selectedSortCriterion: SortCriterionType) {

        super(selectedFiltrationCriterion, userData);

        this.filmsSection = new FilledFilmsSection(films);
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

    updateFilmsSection(films: Movie[] | null): void {
        this.filmsView.updateFilmsSection(films);
    }

    updateAllMoviesFilmsList(shownFilms: Movie[]): void {
        const filmsListView = this.filmsView.filmsListViews[0];     //  TODO: Don't use index here
        filmsListView.filmsList.films = shownFilms;
        filmsListView.setFilmCardViews();

        const filmsListContainer = filmsListView.element.querySelector('.films-list__container');
        if (filmsListContainer) {
            filmsListContainer.innerHTML = '';
            filmsListView.filmCardViews.forEach((filmCardView) => {
                filmsListContainer.append(filmCardView.element);
            })
        }
    }

    private checkNeedToRenderSortPanel(): boolean {
        return !this.filmsSection.isEmpty;
    }
}
