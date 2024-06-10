import Movie from '../movie';

export default abstract class FilmsSection {
    constructor(films: Movie[] | null) {
        this.films = films;
    }

    films: Movie[] | null;
    abstract isEmpty: boolean;

    abstract renderFilmsListsToElement(element: Element): void;
}
