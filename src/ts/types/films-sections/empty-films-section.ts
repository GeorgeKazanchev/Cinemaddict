import FilmsListView from '../../../blocks/films-list/films-list-view';
import EmptyFilmsList from '../films-lists/empty-films-list';
import Movie from '../movie';
import FilmsSection from './films-section';

export default class EmptyFilmsSection extends FilmsSection {
    constructor(films: Movie[] | null) {
        super(films);
    }

    isEmpty: boolean = true;

    getFilmsListViews(): FilmsListView[] {
        const filmsList = new EmptyFilmsList(this.films);
        return [new FilmsListView(filmsList)];
    }
}
