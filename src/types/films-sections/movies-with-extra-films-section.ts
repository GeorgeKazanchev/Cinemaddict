import FilmsListView from '../../blocks/films-list/films-list-view';
import AllMoviesFilmsList from '../films-lists/all-movies-films-list';
import MostCommentedFilmsList from '../films-lists/most-commented-films-list';
import TopRatedFilmsList from '../films-lists/top-rated-films-list';
import Movie from '../movie';
import FilmsSection from './films-section';

export default class MoviesWithExtraFilmsSection extends FilmsSection {
    constructor(films: Movie[]) {
        super(films);
        this.isEmpty = films === null || films.length === 0;
    }

    isEmpty: boolean;

    renderFilmsListsToElement(element: Element): void {
        const topRatedFilms = this.getTopRatedFilms(this.films);
        const mostCommentedFilms = this.getMostCommentedFilms(this.films);

        const allMoviesList = new AllMoviesFilmsList(this.films);
        const topRatedFilmsList = new TopRatedFilmsList(topRatedFilms);
        const mostCommentedFilmsList = new MostCommentedFilmsList(mostCommentedFilms);

        const allMoviesListView = new FilmsListView(allMoviesList);
        const topRatedFilmsListView = new FilmsListView(topRatedFilmsList);
        const mostCommentedFilmsListView = new FilmsListView(mostCommentedFilmsList);

        element.appendChild(allMoviesListView.getElement());
        element.appendChild(topRatedFilmsListView.getElement());
        element.appendChild(mostCommentedFilmsListView.getElement());
    }

    private getTopRatedFilms(films: Movie[] | null): Movie[] {   //  TODO: The method is not completed yet
        const topRatedFilmsCount = 2;
        if (films) {
            const sortedFilms = [...films]
                .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
                .slice(0, topRatedFilmsCount);
            return sortedFilms;
        } else {
            throw new Error('Films are absent.');
        }
    }

    private getMostCommentedFilms(films: Movie[] | null): Movie[] {  //  TODO: The method is not completed yet
        const mostCommentedFilmsCount = 2;
        if (films) {
            const sortedFilms = [...films]
                .sort((a, b) => b.comments.length - a.comments.length)
                .slice(0, mostCommentedFilmsCount);
            return sortedFilms;
        } else {
            throw new Error('Films are absent.');
        }
    }
}