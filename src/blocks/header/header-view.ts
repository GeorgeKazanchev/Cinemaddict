import AbstractView from '../../types/abstract-view';
import UserData from '../../types/user-data';
import ProfileView from '../profile/profile-view';

export default class HeaderView extends AbstractView {
    constructor(isAuthorized: boolean, userData: UserData | null) {
        super();
        this.isAuthorized = isAuthorized;
        this.userData = userData;
    }

    isAuthorized: boolean;
    userData: UserData | null;
    template: string =
        `<header class="header">
            <h1 class="header__logo logo">Cinemaddict</h1>
        </header>`;

    getElement(): Element {
        const element = this.getTemplate();
        if (this.isAuthorized && this.userData !== null) {  //  TODO: Make it simpler
            const profileView = new ProfileView(this.userData);
            const profileElement = profileView.getElement();
            profileElement.classList.add('header__profile');
            element.appendChild(profileElement);
        }
        return element;
    }
}
