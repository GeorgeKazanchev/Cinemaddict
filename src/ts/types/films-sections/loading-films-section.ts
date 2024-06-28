import FilmsListView from '../../../blocks/films-list/films-list-view';
import FilmsList from '../films-lists/films-list';
import LoadingFilmsList from '../films-lists/loading-films-list';
import FilmsSection from './films-section';

export default class LoadingFilmsSection extends FilmsSection {
    constructor() {
        super(null);
    }

    isEmpty: boolean = true;
    filmsLists: FilmsList[] = [];

    getFilmsListViews(): FilmsListView[] {
        const filmsList = new LoadingFilmsList();
        return [new FilmsListView(filmsList)];
    }
}
