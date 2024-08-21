import MainNavigationView from './main-navigation-view';
import UserData from '../../ts/types/user-data';

export default class MainNavigationStatsView extends MainNavigationView {
    constructor(userData: UserData) {
        super(userData);
    }

    public createElement(): Element {
        const element = super.createElement();
        this.checkStatsTabSelected(element);
        return element;
    }

    public bind(): void {
        const navigationTabs = this.element.querySelectorAll('.main-navigation__item');
        navigationTabs.forEach((navigationTab) => {
            navigationTab.addEventListener('click', (evt: Event) => {
                evt.preventDefault();
                this.navigationTabClickHandler(evt);
            })
        });
    }

    public navigationTabClickHandler(_: Event): void { }

    private checkStatsTabSelected(element: Element): void {
        const statsTab = element.querySelector('.main-navigation__additional');
        statsTab?.classList.add('main-navigation__additional--active');
    }
}
