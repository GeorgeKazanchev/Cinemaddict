import Movie from '../movie';
import FilmsList from './films-list';

export default class EmptyFilmsList extends FilmsList {
    constructor(films: Movie[] | null) {
        super(films);
    }

    title: string = 'There are no movies in our database';
    isExtra: boolean = false;
    isEmpty: boolean = false;

    hideTitleIfNeeded(_titleElement: Element): void { }
}
