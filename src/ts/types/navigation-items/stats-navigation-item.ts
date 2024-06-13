import NavigationItem from './navigation-item';

export default class StatsNavigationItem extends NavigationItem {
    constructor() {
        super();
    }

    itemSelector: string = 'main-navigation__additional';
    activeItemClassname: string = 'main-navigation__additional--active';
}
