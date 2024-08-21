import Movie from '../movie';
import FilmsListView from '../../../blocks/films-list/films-list-view';
import { FilmCardsHandlers } from '../handlers';

export default abstract class FilmsSection {
    constructor(films: Movie[] | null) {
        this.films = films;
    }

    films: Movie[] | null;
    abstract isEmpty: boolean;

    public abstract getFilmsListViews(filmCardsHandlers: FilmCardsHandlers): FilmsListView[];

    public renderFilmsListsToElement(filmsListViews: FilmsListView[], element: Element): void {
        filmsListViews.forEach((filmsListView) => {
            element.appendChild(filmsListView.element);
        });
    }
}
