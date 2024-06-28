import FilmsListView from '../../../blocks/films-list/films-list-view';
import FilmsList from '../films-lists/films-list';
import Movie from '../movie';

export default abstract class FilmsSection {
    constructor(films: Movie[] | null) {
        this.films = films;
    }

    films: Movie[] | null;
    abstract filmsLists: FilmsList[];
    abstract isEmpty: boolean;

    abstract getFilmsListViews(): FilmsListView[];

    renderFilmsListsToElement(filmsListViews: FilmsListView[], element: Element): void {
        filmsListViews.forEach((filmsListView) => {
            element.appendChild(filmsListView.element);
        });
    }
}
