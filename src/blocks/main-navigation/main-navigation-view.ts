import AbstractView from '../../ts/abstract-view';
import NavigationItem from '../../ts/types/navigation-items/navigation-item';
import UserData from '../../ts/types/user-data';

export default class MainNavigationView extends AbstractView {
    constructor(selectedItem: NavigationItem, userData: UserData) {
        super();
        this.selectedItem = selectedItem;
        this.userData = userData;
    }

    selectedItem: NavigationItem;
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

    createElement(): Element {
        const element = this.getTemplate();
        this.setItemsFilmsCount(element);
        this.setActiveItem(element);
        return element;
    }

    private setItemsFilmsCount(element: Element): void {
        const watchlistItem = element.querySelector('.main-navigation__item--watchlist');
        const historyItem = element.querySelector('.main-navigation__item--history');
        const favoritesItem = element.querySelector('.main-navigation__item--favorites');

        if (watchlistItem) {
            this.setFilmsCount(watchlistItem, this.userData.filmsInWatchlist);
        }
        if (historyItem) {
            this.setFilmsCount(historyItem, this.userData.filmsWatched);
        }
        if (favoritesItem) {
            this.setFilmsCount(favoritesItem, this.userData.favoriteFilms);
        }
    }

    private setFilmsCount(element: Element, filmsCount: number): void {
        const filmsCountElement = element.querySelector('.main-navigation__item-count');
        if (filmsCountElement) {
            filmsCountElement.textContent = filmsCount.toFixed(0);
        }
    }

    private setActiveItem(element: Element): void {
        this.selectedItem.setActiveItem(element);
    }
}
