import Movie from '../movie';
import FilmsList from './films-list';

export default class TopRatedFilmsList extends FilmsList {
    constructor(films: Movie[] | null) {
        super(films);
        this.isEmpty = films === null || films.length === 0;
    }

    title: string = 'Top rated';
    isExtra: boolean = true;
    isEmpty: boolean;
    isTitleHidden: boolean = false;
}
