import FilmsListView from '../../../blocks/films-list/films-list-view';
import ErrorFilmsList from '../films-lists/error-films-list';
import FilmsSection from './films-section';

export default class ErrorFilmsSection extends FilmsSection {
    constructor() {
        super(null);
    }

    isEmpty: boolean = true;

    public getFilmsListViews(): FilmsListView[] {
        const filmsList = new ErrorFilmsList();
        return [new FilmsListView(filmsList)];
    }
}
