import AbstractView from '../../types/abstract-view';
import FilmsListType from '../../types/films-list-type';
import FilmsSectionType from '../../types/films-section-type';
import Movie from '../../types/movie';
import FilmsListView from '../films-list/films-list-view';

export default class FilmsView extends AbstractView {
    constructor(films: Movie[] | null, sectionType: FilmsSectionType) {
        super();
        this.films = films;
        this.sectionType = sectionType;
    }

    films: Movie[] | null;
    sectionType: FilmsSectionType;
    template: string =
        `<section class="films"></section>`;

    static get TOP_RATED_FILMS_COUNT(): number { return 2; };
    static get MOST_COMMENTED_FILMS_COUNT(): number { return 2; };

    static FILMS_SECTION_LIST_TYPE_MAP: Map<FilmsSectionType, FilmsListType> = new Map(
        [
            [FilmsSectionType.Empty, FilmsListType.Empty],
            [FilmsSectionType.Loading, FilmsListType.Loading],
            [FilmsSectionType.Movies, FilmsListType.AllMovies]
        ]
    );

    getElement(): Element {
        const element = this.getTemplate();
        this.setFilmsLists(element);
        return element;
    }

    private setFilmsLists(element: Element): void {
        switch (this.sectionType) {
            case FilmsSectionType.Empty:
            case FilmsSectionType.Loading:
            case FilmsSectionType.Movies: {
                const filmsListType = FilmsView.FILMS_SECTION_LIST_TYPE_MAP.get(this.sectionType);
                if (filmsListType) {
                    const filmsListView = new FilmsListView(this.films, filmsListType);
                    element.appendChild(filmsListView.getElement());
                }
                break;
            }
            case FilmsSectionType.MoviesWithExtra: {
                const topRatedFilms = this.getTopRatedFilms();
                const mostCommentedFilms = this.getMostCommentedFilms();

                const filmsListView = new FilmsListView(this.films, FilmsListType.AllMovies);
                const topRatedFilmsView = new FilmsListView(topRatedFilms, FilmsListType.TopRated);
                const mostCommentedFilmsView = new FilmsListView(mostCommentedFilms, FilmsListType.MostCommented);

                element.appendChild(filmsListView.getElement());
                element.appendChild(topRatedFilmsView.getElement());
                element.appendChild(mostCommentedFilmsView.getElement());

                break;
            }
        }
    }

    private getTopRatedFilms(): Movie[] {   //  TODO: The method is not completed yet
        if (this.films) {
            const sortedFilms = [...this.films]
                .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
                .slice(0, FilmsView.TOP_RATED_FILMS_COUNT);
            return sortedFilms;
        } else {
            throw new Error('Films are absent.');
        }
    }

    private getMostCommentedFilms(): Movie[] {  //  TODO: The method is not completed yet
        if (this.films) {
            const sortedFilms = [...this.films]
                .sort((a, b) => b.comments.length - a.comments.length)
                .slice(0, FilmsView.MOST_COMMENTED_FILMS_COUNT);
            return sortedFilms;
        } else {
            throw new Error('Films are absent.');
        }
    }
}
