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

    public get template(): string {
        return `<header class="header">
                    <h1 class="header__logo logo">Cinemaddict</h1>
                    ${this.getProfileMarkup()}
                </header>`;
    }

    public createElement(): Element {
        return this.getTemplate();
    }

    public updateUserRating(): void {
        this.profileView.updateRating();
    }

    private getProfileMarkup(): string {
        if (this.isAuthorized && this.userData !== null) {
            const profileElement = this.profileView.element;
            profileElement.classList.add('header__profile');
            return profileElement.outerHTML;
        } else {
            return '';
        }
    }
}
