import AbstractView from '../../types/abstract-view';
import FilmsSectionType from '../../types/films-section-type';
import Movie from '../../types/movie';
import FilmsView from '../films/films-view';

//  TODO: The first prototype version. It will be updated
export default class MainView extends AbstractView {
    constructor(films: Movie[] | null, filmsSectionType: FilmsSectionType) {
        super();
        this.films = films;
        this.filmsSectionType = filmsSectionType;
    }

    films: Movie[] | null;
    filmsSectionType: FilmsSectionType;
    template: string =
        `<main class="main"></main>`;

    getElement(): Element {
        const element = this.getTemplate();
        const filmsView = new FilmsView(this.films, this.filmsSectionType);
        element.appendChild(filmsView.getElement());
        return element;
    }
}
