import Movie from '../movie';
import FilmsList from './films-list';

export default class LoadingFilmsList extends FilmsList {
    constructor(films: Movie[] | null) {
        super(films);
    }

    title: string = 'Loading...';
    isExtra: boolean = false;
    isEmpty: boolean = false;

    hideTitleIfNeeded(_titleElement: Element): void { }
}
