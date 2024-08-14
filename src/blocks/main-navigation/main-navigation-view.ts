import AbstractView from '../../ts/abstract-view';
import FiltrationType from '../../ts/types/filtration-type';
import UserData from '../../ts/types/user-data';

export default abstract class MainNavigationView extends AbstractView {
    constructor(userData: UserData) {
        super();
        this.userData = userData;
    }

    userData: UserData;
    template: string =
        `<nav class="main-navigation">
            <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--all">
                    All movies
                </a>
                <a href="#watchlist" class="main-navigation__item main-navigation__item--watchlist">
                    Watchlist <span class="main-navigation__item-count"></span>
                </a>
                <a href="#history" class="main-navigation__item main-navigation__item--history">
                    History <span class="main-navigation__item-count"></span>
                </a>
                <a href="#favorites" class="main-navigation__item main-navigation__item--favorites">
                    Favorites <span class="main-navigation__item-count"></span>
                </a>
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>`;

    public createElement(): Element {
        const element = this.getTemplate();
        this.setWatchlist(element);
        this.setHistory(element);
        this.setFavorites(element);
        return element;
    }

    protected setWatchlist(element: Element): void {
        const watchlistTab = element.querySelector(this.getCriterionSelector(FiltrationType.Watchlist));
        if (watchlistTab) {
            this.setFilmsCount(watchlistTab, this.userData.filmsInWatchlist);
        }
    }

    protected setHistory(element: Element): void {
        const historyTab = element.querySelector(this.getCriterionSelector(FiltrationType.History));
        if (historyTab) {
            this.setFilmsCount(historyTab, this.userData.allFilmsWatched);
        }
    }

    protected setFavorites(element: Element): void {
        const favoritesTab = element.querySelector(this.getCriterionSelector(FiltrationType.Favorites));
        if (favoritesTab) {
            this.setFilmsCount(favoritesTab, this.userData.favoriteFilms);
        }
    }

    protected getCriterionSelector(filtrationCriterion: FiltrationType): string {
        switch (filtrationCriterion) {
            case FiltrationType.AllMovies: {
                return '.main-navigation__item--all';
            }
            case FiltrationType.Watchlist: {
                return '.main-navigation__item--watchlist';
            }
            case FiltrationType.History: {
                return '.main-navigation__item--history';
            }
            case FiltrationType.Favorites: {
                return '.main-navigation__item--favorites';
            }
            default: {
                throw new RangeError('Unsupported filtration criterion type.');
            }
        }
    }

    private setFilmsCount(element: Element, filmsCount: number): void {
        const filmsCountElement = element.querySelector('.main-navigation__item-count');
        if (filmsCountElement) {
            filmsCountElement.textContent = filmsCount.toFixed(0);
        }
    }
}
