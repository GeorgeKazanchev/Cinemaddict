import FilmsListView from '../../../blocks/films-list/films-list-view';
import EmptyFilmsList from '../films-lists/empty-films-list';
import FilmsSection from './films-section';
import { FilmCardsHandlers } from '../handlers';

export default class EmptyFilmsSection extends FilmsSection {
    constructor() {
        super(null);
    }

    isEmpty: boolean = true;

    public getFilmsListViews(filmCardsHandlers: FilmCardsHandlers): FilmsListView[] {
        const filmsList = new EmptyFilmsList();
        return [
            new FilmsListView(filmsList, filmCardsHandlers)
        ];
    }
}
