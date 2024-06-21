import Movie from '../movie';
import FilmsList from './films-list';

export default class AllMoviesFilmsList extends FilmsList {
    constructor(films: Movie[] | null, allFilmsShown: boolean) {
        super(films);
        this.isEmpty = films === null || films.length === 0;
        this.allFilmsShown = allFilmsShown;
    }

    title: string = 'All movies. Upcoming';
    isExtra: boolean = false;
    isEmpty: boolean;
    allFilmsShown: boolean;

    hideTitleIfNeeded(titleElement: Element): void {
        titleElement.classList.add('visually-hidden');
    }
}
