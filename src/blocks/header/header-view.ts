import AbstractView from '../../ts/abstract-view';
import UserData from '../../ts/types/user-data';

export default class HeaderView extends AbstractView {
    constructor(isAuthorized: boolean, userData: UserData) {
        super();
        this.isAuthorized = isAuthorized;
        this.userData = userData;
    }

    isAuthorized: boolean;
    userData: UserData;
    template: string =
        `<header class="header">
            <h1 class="header__logo logo">Cinemaddict</h1>
        </header>`;

    createElement(): Element {
        const element = this.getTemplate();
        return element;
    }
}
