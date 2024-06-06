import NavigationItem from './navigation-item';

export default class HistoryNavigationItem extends NavigationItem {
    constructor() {
        super();
    }

    itemSelector: string = '.main-navigation__item--history';
    activeItemClassname: string = 'main-navigation__item--active';
}
