import FilmsListView from '../../../blocks/films-list/films-list-view';
import LoadingFilmsList from '../films-lists/loading-films-list';
import FilmsSection from './films-section';
import { FilmCardsHandlers } from '../handlers';

export default class LoadingFilmsSection extends FilmsSection {
    constructor() {
        super(null);
    }

    isEmpty: boolean = true;

    public getFilmsListViews(filmCardsHandlers: FilmCardsHandlers): FilmsListView[] {
        const filmsList = new LoadingFilmsList();
        return [
            new FilmsListView(filmsList, filmCardsHandlers)
        ];
    }
}
