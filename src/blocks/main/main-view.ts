import AbstractView from '../../types/abstract-view';
import FilmsSectionType from '../../types/films-section-type';
import Movie from '../../types/movie';
import SortCriterion from '../../types/sort-criterion';
import FilmsView from '../films/films-view';
import SortView from '../sort/sort-view';

//  TODO: The first prototype version. It will be updated
export default class MainView extends AbstractView {
    constructor(films: Movie[] | null, filmsSectionType: FilmsSectionType, activeSortCriterion: SortCriterion) {
        super();
        this.films = films;
        this.filmsSectionType = filmsSectionType;
        this.activeSortCriterion = activeSortCriterion;
    }

    films: Movie[] | null;
    filmsSectionType: FilmsSectionType;
    activeSortCriterion: SortCriterion;
    template: string =
        `<main class="main"></main>`;

    getElement(): Element {
        const element = this.getTemplate();
        const sortView = new SortView(this.activeSortCriterion);
        const filmsView = new FilmsView(this.films, this.filmsSectionType);
        element.appendChild(sortView.getElement());
        element.appendChild(filmsView.getElement());
        return element;
    }
}
