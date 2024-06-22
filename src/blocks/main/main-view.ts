import AbstractView from '../../ts/abstract-view';
import UserData from '../../ts/types/user-data';

export default abstract class MainView extends AbstractView {
    constructor(userData: UserData) {
        super();
        this.userData = userData;
    }

    userData: UserData;
    template: string =
        `<main class="main"></main>`;
}
