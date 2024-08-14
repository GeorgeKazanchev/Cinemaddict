import MainView from './main-view';
import SortView from '../sort/sort-view';
import MainNavigationFilmsView from '../main-navigation/main-navigation-films-view';
import FilmsView from '../films/films-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import EmptyFilmsSection from '../../ts/types/films-sections/empty-films-section';
import FilledFilmsSection from '../../ts/types/films-sections/filled-films-section';
import UserData from '../../ts/types/user-data';
import SortType from '../../ts/types/sort-type';
import FiltrationType from '../../ts/types/filtration-type';
import Movie from '../../ts/types/movie';

export default class MainFilmsView extends MainView {
    constructor(selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData, films: Movie[] | null,
        selectedSortCriterion: SortCriterionType, allFilmsShown: boolean) {

        super(userData);

        this.filmsSection = this.getFilmsSection(films, allFilmsShown);
        this.selectedFiltrationCriterion = selectedFiltrationCriterion;
        this.selectedSortCriterion = selectedSortCriterion;

        this.mainNavigationView = new MainNavigationFilmsView(this.selectedFiltrationCriterion, this.userData);
        this.filmsView = new FilmsView(this.filmsSection);
        this.sortView = null;
    }

    filmsSection: FilmsSection;
    selectedFiltrationCriterion: FiltrationCriterionType;
    selectedSortCriterion: SortCriterionType;
    mainNavigationView: MainNavigationFilmsView;
    filmsView: FilmsView;
    sortView: SortView | null;

    public createElement(): Element {
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

    public updateSelectedFiltrationCriterion(filtrationCriterion: FiltrationCriterionType): void {
        this.mainNavigationView.updateSelectedFiltrationCriterion(filtrationCriterion);
    }

    public updateSelectedSortCriterion(sortCriterion: SortCriterionType): void {
        this.sortView?.updateSelectedSortCriterion(sortCriterion);
    }

    public updateFilmsSection(films: Movie[] | null, allFilmsShown: boolean): void {
        this.filmsView.updateFilmsSection(films, allFilmsShown);
    }

    public updateAllMoviesFilmsList(shownFilms: Movie[]): void {
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

    public hideShowMoreButton(): void {
        const showMoreButton = this.element.querySelector('.films-list__show-more');
        showMoreButton?.remove();
    }

    private getFilmsSection(films: Movie[] | null, allFilmsShown: boolean): FilmsSection {
        if (films && films.length > 0) {
            return new FilledFilmsSection(films, allFilmsShown);
        } else {
            return new EmptyFilmsSection();
        }
    }

    private checkNeedToRenderSortPanel(): boolean {
        return !this.filmsSection.isEmpty;
    }
}
