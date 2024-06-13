import FilmsListView from '../../../blocks/films-list/films-list-view';
import LoadingFilmsList from '../films-lists/loading-films-list';
import Movie from '../movie';
import FilmsSection from './films-section';

export default class LoadingFilmsSection extends FilmsSection {
    constructor(films: Movie[] | null) {
        super(films);
    }

    isEmpty: boolean = true;

    renderFilmsListsToElement(element: Element): void {
        const filmsList = new LoadingFilmsList(this.films);
        const filmsListView = new FilmsListView(filmsList);
        element.appendChild(filmsListView.element);
    }
}
