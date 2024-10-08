import MainView from './main-view';
import SortView from '../sort/sort-view';
import MainNavigationFilmsView from '../main-navigation/main-navigation-films-view';
import FilmsView from '../films/films-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import EmptyFilmsSection from '../../ts/types/films-sections/empty-films-section';
import LoadingFilmsSection from '../../ts/types/films-sections/loading-films-section';
import ErrorFilmsSection from '../../ts/types/films-sections/error-films-section';
import FilledFilmsSection from '../../ts/types/films-sections/filled-films-section';
import UserData from '../../ts/types/user-data';
import SortType from '../../ts/types/sort-type';
import FiltrationType from '../../ts/types/filtration-type';
import Movie from '../../ts/types/movie';
import { FilmCardsHandlers } from '../../ts/types/handlers';

export default class MainFilmsView extends MainView {
    constructor(filtrationSelected: FiltrationType, userData: UserData, films: Movie[] | null,
        sortSelected: SortType, areAllFilmsShown: boolean, areFilmsLoaded: boolean, isLoadingFailed: boolean,
        filmCardsHandlers: FilmCardsHandlers
    ) {
        super(userData);

        this.filmsSection = this.getFilmsSection(films, areAllFilmsShown, areFilmsLoaded, isLoadingFailed);
        this.filtrationSelected = filtrationSelected;
        this.sortSelected = sortSelected;

        this.mainNavigationView = new MainNavigationFilmsView(this.filtrationSelected, this.userData);
        this.filmsView = new FilmsView(this.filmsSection, filmCardsHandlers);
        this.sortView = new SortView(sortSelected);
    }

    filmsSection: FilmsSection;
    filtrationSelected: FiltrationType;
    sortSelected: SortType;
    mainNavigationView: MainNavigationFilmsView;
    filmsView: FilmsView;
    sortView: SortView;

    public createElement(): Element {
        const element = this.getTemplate();
        element.appendChild(this.mainNavigationView.element);
        element.appendChild(this.sortView.element);
        element.appendChild(this.filmsView.element);
        if (!this.needToRenderSortPanel()) {
            this.sortView.isVisible = false;
        }
        return element;
    }

    public updateSelectedFiltrationCriterion(filtrationCriterion: FiltrationType): void {
        this.mainNavigationView.updateSelectedFiltrationCriterion(filtrationCriterion);
    }

    public updateSelectedSortCriterion(sortCriterion: SortType): void {
        this.sortView?.updateSelectedSortCriterion(sortCriterion);
    }

    public updateFilmsSection(films: Movie[] | null, areAllFilmsShown: boolean, areFilmsLoaded: boolean,
        isLoadingFailed: boolean
    ): void {
        const filmsSection = this.getFilmsSection(films, areAllFilmsShown, areFilmsLoaded, isLoadingFailed);
        this.filmsSection = filmsSection;
        this.filmsView.updateFilmsSection(filmsSection);
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

    public updateSortPanelVisibility(isVisible?: boolean): void {
        const needToMakeVisible = isVisible ?? this.needToRenderSortPanel();
        this.sortView.isVisible = needToMakeVisible;
    }

    public toggleMarkWatchedButtonState(filmId: string): void {
        const buttons = this.element.querySelectorAll(`.film-card[data-film-id="${filmId}"] .film-card__controls-item--mark-as-watched`);
        buttons.forEach((button) => button.classList.toggle('film-card__controls-item--active'));
    }

    public toggleWatchlistButtonState(filmId: string): void {
        const buttons = this.element.querySelectorAll(`.film-card[data-film-id="${filmId}"] .film-card__controls-item--add-to-watchlist`);
        buttons.forEach((button) => button.classList.toggle('film-card__controls-item--active'));
    }

    public toggleFavoritesButtonState(filmId: string): void {
        const buttons = this.element.querySelectorAll(`.film-card[data-film-id="${filmId}"] .film-card__controls-item--favorite`);
        buttons.forEach((button) => button.classList.toggle('film-card__controls-item--active'));
    }

    private getFilmsSection(films: Movie[] | null = null, allFilmsShown: boolean = false,
        areFilmsLoaded: boolean = false, isLoadingFailed: boolean = false
    ): FilmsSection {
        if (areFilmsLoaded) {
            if (films && films.length > 0) {
                return new FilledFilmsSection(films, allFilmsShown);
            } else {
                return new EmptyFilmsSection();
            }
        } else {
            if (isLoadingFailed) {
                return new ErrorFilmsSection();
            } else {
                return new LoadingFilmsSection();
            }
        }
    }

    private needToRenderSortPanel(): boolean {
        return (
            !(this.filmsSection instanceof EmptyFilmsSection)
            && !(this.filmsSection instanceof LoadingFilmsSection)
        );
    }
}
