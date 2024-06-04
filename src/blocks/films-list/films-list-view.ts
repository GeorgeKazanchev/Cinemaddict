import AbstractView from '../../types/abstract-view';
import FilmsListType from '../../types/films-list-type';
import Movie from '../../types/movie';
import FilmCardView from '../film-card/film-card-view';

export default class FilmsListView extends AbstractView {
    constructor(films: Movie[] | null, listType: FilmsListType) {
        super();
        this.films = films;
        this.listType = listType;
    }

    films: Movie[] | null;
    listType: FilmsListType;
    template: string =
        `<section class="films-list">
            <h2 class="films-list__title"></h2>
        </section>`;

    static get ALL_MOVIES_TITLE(): string { return 'All movies. Upcoming'; };
    static get TOP_RATED_TITLE(): string { return 'Top rated'; };
    static get MOST_COMMENTED_TITLE(): string { return 'Most commented'; };
    static get EMPTY_TITLE(): string { return 'There are no movies in our database'; };
    static get LOADING_TITLE(): string { return 'Loading...'; };
    static get EXTRA_LIST_MODIFIER(): string { return 'films-list--extra'; };
    static get SHOW_MORE_BUTTON_TEXT(): string { return 'Show more'; };

    static FILMS_LIST_TYPE_TITLE_MAP: Map<FilmsListType, string> = new Map(
        [
            [FilmsListType.Empty, FilmsListView.EMPTY_TITLE],
            [FilmsListType.Loading, FilmsListView.LOADING_TITLE],
            [FilmsListType.AllMovies, FilmsListView.ALL_MOVIES_TITLE],
            [FilmsListType.TopRated, FilmsListView.TOP_RATED_TITLE],
            [FilmsListType.MostCommented, FilmsListView.MOST_COMMENTED_TITLE]
        ]
    );

    getElement(): Element {
        const element = this.getTemplate();
        this.setModifier(element);
        this.setTitle(element);
        this.setFilmsListContainer(element);
        this.setShowMoreButton(element);
        return element;
    }

    private setModifier(element: Element): void {
        if (this.listType === FilmsListType.TopRated || this.listType === FilmsListType.MostCommented) {
            element.classList.add(FilmsListView.EXTRA_LIST_MODIFIER);
        }
    }

    private setTitle(element: Element): void {
        const titleElement = element.querySelector('.films-list__title');
        if (titleElement) {
            if (this.listType === FilmsListType.AllMovies) {
                titleElement.classList.add('visually-hidden');
            }

            const title = FilmsListView.FILMS_LIST_TYPE_TITLE_MAP.get(this.listType);
            if (title) {
                titleElement.textContent = title;
            }
        }
    }

    private setFilmsListContainer(element: Element): void {
        const needToRender = this.checkShouldFilmsRendered();
        if (needToRender) {
            const container = document.createElement('div');
            container.classList.add('films-list__container');

            this.films?.forEach((film) => {
                const filmCardView = new FilmCardView(film);
                container.appendChild(filmCardView.getElement());
            });

            element.appendChild(container);
        }
    }

    private setShowMoreButton(element: Element): void {
        const needToRender = this.checkShouldFilmsRendered();
        if (needToRender) {
            const button = document.createElement('button');
            button.classList.add('films-list__show-more');
            button.textContent = FilmsListView.SHOW_MORE_BUTTON_TEXT;
            element.appendChild(button);
        }
    }

    private checkShouldFilmsRendered(): boolean {
        return this.listType !== FilmsListType.Empty
            && this.listType !== FilmsListType.Loading
            && this.films !== null
            && this.films.length > 0;
    }
}
