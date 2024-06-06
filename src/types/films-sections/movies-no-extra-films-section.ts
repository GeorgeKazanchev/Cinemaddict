import FilmsListView from '../../blocks/films-list/films-list-view';
import AllMoviesFilmsList from '../films-lists/all-movies-films-list';
import Movie from '../movie';
import FilmsSection from './films-section';

export default class MoviesNoExtraFilmsSection extends FilmsSection {
    constructor(films: Movie[]) {
        super(films);
    }

    renderFilmsListsToElement(element: Element): void {
        const filmsList = new AllMoviesFilmsList(this.films);
        const filmsListView = new FilmsListView(filmsList);
        element.appendChild(filmsListView.getElement());
    }
}
