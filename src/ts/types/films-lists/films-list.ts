import Movie from '../movie';

export default abstract class FilmsList {
    constructor(films: Movie[] | null) {
        this.films = films;
    }

    films: Movie[] | null;
    abstract title: string;
    abstract isExtra: boolean;
    abstract isEmpty: boolean;
    abstract isTitleHidden: boolean;
}
