import NavigationItem from './navigation-item';

export default class AllMoviesNavigationItem extends NavigationItem {
    constructor() {
        super();
    }

    itemSelector: string = '.main-navigation__item--all';
    activeItemClassname: string = 'main-navigation__item--active';
}
