import NavigationItem from './navigation-item';

export default class FavoritesNavigationItem extends NavigationItem {
    constructor() {
        super();
    }

    itemSelector: string = 'main-navigation__item--favorites';
    activeItemClassname: string = 'main-navigation__item--active';
}
