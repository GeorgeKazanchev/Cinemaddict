import FilmsListView from '../../../blocks/films-list/films-list-view';
import AllMoviesFilmsList from '../films-lists/all-movies-films-list';
import Movie from '../movie';
import FilmsSection from './films-section';

export default class MoviesNoExtraFilmsSection extends FilmsSection {
    constructor(films: Movie[]) {
        super(films);
        this.isEmpty = films === null || films.length === 0;
    }

    isEmpty: boolean;

    getFilmsListViews(): FilmsListView[] {
        const filmsList = new AllMoviesFilmsList(this.films);
        return [new FilmsListView(filmsList)];
    }
}
