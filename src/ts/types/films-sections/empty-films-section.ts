import FilmsListView from '../../../blocks/films-list/films-list-view';
import EmptyFilmsList from '../films-lists/empty-films-list';
import FilmsSection from './films-section';

export default class EmptyFilmsSection extends FilmsSection {
    constructor() {
        super(null);
    }

    isEmpty: boolean = true;

    getFilmsListViews(): FilmsListView[] {
        const filmsList = new EmptyFilmsList();
        return [new FilmsListView(filmsList)];
    }
}
