import Model from '../../ts/models/model';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';
import Movie from '../../ts/types/movie';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import UserData from '../../ts/types/user-data';
import FilmsPresenter from '../films/films-presenter';
import MainNavigationFilmsPresenter from '../main-navigation/main-navigation-films-presenter';
import SortPresenter from '../sort/sort-presenter';
import MainFilmsView from './main-films-view';
import { getFilmsSection } from '../../ts/utils';

export default class MainFilmsPresenter {
    constructor(model: Model, selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData,
        films: Movie[] | null, selectedSortCriterion: SortCriterionType, allFilmsShown: boolean,
        updateUserRating: () => void) {

        const filmsSection = getFilmsSection(films, allFilmsShown);

        this.model = model;
        this.view = new MainFilmsView(selectedFiltrationCriterion, userData, filmsSection, selectedSortCriterion);

        this.filmsPresenter = new FilmsPresenter(model, filmsSection,
            updateUserRating, this.updateHistoryTab, this.updateWatchlistTab, this.updateFavoritesTab);
        this.mainNavigationPresenter = new MainNavigationFilmsPresenter(model, selectedFiltrationCriterion,
            userData, this.filterFilms);
        this.sortPresenter = new SortPresenter(model, selectedSortCriterion, this.sortFilms);
    }

    private model: Model;
    private view: MainFilmsView;
    private filmsPresenter: FilmsPresenter;
    private mainNavigationPresenter: MainNavigationFilmsPresenter;
    private sortPresenter: SortPresenter;

    public get element(): Element {
        return Object.freeze(this.view.element);
    }

    public render(element: Element): void {
        this.mainNavigationPresenter.render(this.view.element);
        if (this.needToRenderSortPanel()) {
            this.sortPresenter.render(this.view.element);
        }
        this.filmsPresenter.render(this.view.element);
        element.appendChild(this.view.element);
    }

    private updateHistoryTab(): void {
        this.mainNavigationPresenter.updateHistoryTab();
    }

    private updateWatchlistTab(): void {
        this.mainNavigationPresenter.updateWatchlistTab();
    }

    private updateFavoritesTab(): void {
        this.mainNavigationPresenter.updateFavoritesTab();
    }

    private filterFilms(filtrationCriterion: FiltrationCriterionType): void {
        this.model.selectedFiltrationCriterion = filtrationCriterion;
        this.model.selectedSortCriterion = SortCriterionType.Default;
        this.model.resetShownFilmsCount();
        this.mainNavigationPresenter.updateSelectedFiltrationCriterion(filtrationCriterion);
        this.sortPresenter.updateSelectedSortCriterion(SortCriterionType.Default);
        this.filmsPresenter.updateFilmsSection(this.model.shownFilms, this.model.allFilmsShown);
    }

    private sortFilms(sortCriterion: SortCriterionType): void {
        this.model.selectedSortCriterion = sortCriterion;
        this.model.resetShownFilmsCount();
        this.sortPresenter.updateSelectedSortCriterion(sortCriterion);
        this.filmsPresenter.updateFilmsSection(this.model.shownFilms, this.model.allFilmsShown);
    }

    private needToRenderSortPanel(): boolean {
        return !this.filmsPresenter.isFilmsSectionEmpty();
    }
}
