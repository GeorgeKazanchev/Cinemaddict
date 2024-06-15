import AbstractView from '../../ts/abstract-view';
import NavigationItem from '../../ts/types/navigation-items/navigation-item';
import UserData from '../../ts/types/user-data';

export default abstract class MainView extends AbstractView {
    constructor(selectedNavigationItem: NavigationItem, userData: UserData) {
        super();
        this.selectedNavigationItem = selectedNavigationItem;
        this.userData = userData;
    }

    selectedNavigationItem: NavigationItem;
    userData: UserData;
    template: string =
        `<main class="main"></main>`;
}
