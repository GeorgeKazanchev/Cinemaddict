import Model from '../../ts/models/model';
import FilmsSection from '../../ts/types/films-sections/films-section';
import FilmsListPresenter from '../films-list/films-list-presenter';
import FilmsView from './films-view';

export default class FilmsPresenter {
    constructor(model: Model, filmsSection: FilmsSection,
        updateUserRating: () => void, updateHistoryTab: () => void,
        updateWatchlistTab: () => void, updateFavoritesTab: () => void) {

        this.model = model;
        this.view = new FilmsView(filmsSection);

        this.filmsListPresenters = [];
        filmsSection.filmsLists.forEach((filmsList) => {
            this.filmsListPresenters.push(
                new FilmsListPresenter(model, filmsList,
                    updateUserRating, updateHistoryTab,
                    updateWatchlistTab, updateFavoritesTab));
        });

        this.setShowMoreButtonClickHandler();
    }

    private model: Model;
    private view: FilmsView;
    private filmsListPresenters: FilmsListPresenter[];

    private setShowMoreButtonClickHandler(): void {
        const showMoreButton = this.view.element.querySelector('.films-list__show-more');
        showMoreButton?.addEventListener('click', (evt: Event) => {
            evt.preventDefault();
            this.model.increaseShownFilmsCount();
            this.view.updateAllMoviesFilmsList(this.model.shownFilms);

            if (this.model.allFilmsShown) {
                this.view.hideShowMoreButton();
            }
        });
    }
}
