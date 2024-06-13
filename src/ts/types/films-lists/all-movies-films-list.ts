import Movie from '../movie';
import FilmsList from './films-list';

export default class AllMoviesFilmsList extends FilmsList {
    constructor(films: Movie[] | null) {
        super(films);
        this.isEmpty = films === null || films.length === 0;
    }

    title: string = 'All movies. Upcoming';
    isExtra: boolean = false;
    isEmpty: boolean;

    hideTitleIfNeeded(titleElement: Element): void {
        titleElement.classList.add('visually-hidden');
    }
}
