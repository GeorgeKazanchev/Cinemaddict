import AbstractView from '../../ts/abstract-view';
import ProfileView from '../profile/profile-view';
import UserData from '../../ts/types/user-data';

export default class HeaderView extends AbstractView {
    constructor(isAuthorized: boolean, userData: UserData) {
        super();
        this.isAuthorized = isAuthorized;
        this.userData = userData;
        this.profileView = new ProfileView(this.userData);
    }

    isAuthorized: boolean;
    userData: UserData;
    profileView: ProfileView;
    template: string =
        `<header class="header">
            <h1 class="header__logo logo">Cinemaddict</h1>
        </header>`;

    public createElement(): Element {
        const element = this.getTemplate();
        if (this.isAuthorized && this.userData !== null) {
            const profileElement = this.profileView.element;
            profileElement.classList.add('header__profile');
            element.appendChild(profileElement);
        }
        return element;
    }

    public updateUserRating(): void {
        this.profileView.updateRating();
    }
}
