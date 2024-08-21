import FilmsListView from '../../../blocks/films-list/films-list-view';
import ErrorFilmsList from '../films-lists/error-films-list';
import FilmsSection from './films-section';
import { FilmCardsHandlers } from '../handlers';

export default class ErrorFilmsSection extends FilmsSection {
    constructor() {
        super(null);
    }

    isEmpty: boolean = true;

    public getFilmsListViews(filmCardsHandlers: FilmCardsHandlers): FilmsListView[] {
        const filmsList = new ErrorFilmsList();
        return [
            new FilmsListView(filmsList, filmCardsHandlers)
        ];
    }
}
