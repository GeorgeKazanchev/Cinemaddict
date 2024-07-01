import Model from '../../ts/models/model';
import FilmsView from './films-view';
import FilmsListPresenter from '../films-list/films-list-presenter';
import FilmsSection from '../../ts/types/films-sections/films-section';
import Movie from '../../ts/types/movie';
import FilledFilmsSection from '../../ts/types/films-sections/filled-films-section';

export default class FilmsPresenter {
    constructor(model: Model, filmsSection: FilmsSection,
        updateUserRating: () => void, updateHistoryTab: () => void,
        updateWatchlistTab: () => void, updateFavoritesTab: () => void) {

        this.model = model;
        this.view = new FilmsView(filmsSection);
        this.filmsListPresenters = filmsSection.filmsLists?.map((filmsList) =>
            new FilmsListPresenter(model, filmsList,
                updateUserRating, updateHistoryTab,
                updateWatchlistTab, updateFavoritesTab));

        this.setShowMoreButtonClickHandler();
    }

    private model: Model;
    private view: FilmsView;
    private filmsListPresenters: FilmsListPresenter[];

    public render(element: Element): void {
        this.renderFilmsLists();
        element.appendChild(this.view.element);
    }

    public isFilmsSectionEmpty(): boolean {
        return this.view.filmsSection.isEmpty;
    }

    public updateFilmsSection(films: Movie[] | null, allFilmsShown: boolean): void {
        this.view.filmsSection = new FilledFilmsSection(films, allFilmsShown);
        this.renderFilmsLists();
    }

    private setShowMoreButtonClickHandler(): void {
        const showMoreButton = this.view.element.querySelector('.films-list__show-more');
        showMoreButton?.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.model.increaseShownFilmsCount();
            this.updateAllMoviesFilmsList(this.model.shownFilms);

            if (this.model.allFilmsShown) {
                this.view.hideShowMoreButton();
            }
        });
    }

    private updateAllMoviesFilmsList(shownFilms: Movie[]): void {
        const filmsListPresenter = this.filmsListPresenters[0];     //  TODO: Don't use index here
        filmsListPresenter.updateFilmsList(shownFilms);
    }

    private renderFilmsLists(): void {
        this.view.element.innerHTML = '';
        this.filmsListPresenters.forEach((presenter) => {
            presenter.render(this.view.element);
        });
    }
}
