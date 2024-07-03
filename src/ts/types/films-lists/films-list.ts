import Movie from '../movie';

export default abstract class FilmsList {
    constructor(films: Movie[] | null) {
        this.films = films;
    }

    films: Movie[] | null;
    abstract title: string;
    abstract isExtra: boolean;
    abstract isEmpty: boolean;

    public abstract hideTitleIfNeeded(titleElement: Element): void;

    public setTitle(element: Element): void {
        const titleElement = element.querySelector('.films-list__title');
        if (titleElement) {
            this.hideTitleIfNeeded(titleElement);
            titleElement.textContent = this.title;
        }
    }
}
