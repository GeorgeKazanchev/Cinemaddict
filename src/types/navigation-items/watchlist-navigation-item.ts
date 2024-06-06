import NavigationItem from './navigation-item';

export default class WatchlistNavigationItem extends NavigationItem {
    constructor() {
        super();
    }

    itemSelector: string = '.main-navigation__item--watchlist';
    activeItemClassname: string = 'main-navigation__item--active';
}
