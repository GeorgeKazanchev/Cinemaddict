import Movie from '../movie';
import FilmsList from './films-list';

export default class MostCommentedFilmsList extends FilmsList {
    constructor(films: Movie[] | null) {
        super(films);
        this.isEmpty = films === null || films.length === 0;
    }

    title: string = 'Most commented';
    isExtra: boolean = true;
    isEmpty: boolean;

    hideTitleIfNeeded(_titleElement: Element): void { }
}
