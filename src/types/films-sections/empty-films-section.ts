import FilmsListView from '../../blocks/films-list/films-list-view';
import EmptyFilmsList from '../films-lists/empty-films-list';
import Movie from '../movie';
import FilmsSection from './films-section';

export default class EmptyFilmsSection extends FilmsSection {
    constructor(films: Movie[] | null) {
        super(films);
    }

    renderFilmsListsToElement(element: Element): void {
        const filmsList = new EmptyFilmsList(this.films);
        const filmsListView = new FilmsListView(filmsList);
        element.appendChild(filmsListView.getElement());
    }
}
