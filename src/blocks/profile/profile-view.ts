import AbstractView from '../../types/abstract-view';
import UserData from '../../types/user-data';

export default class ProfileView extends AbstractView {
    constructor(userData: UserData) {
        super();
        this.userData = userData;
    }

    userData: UserData;
    template: string =
        `<section class="profile">
            <img class="profile__avatar" src="" alt="Avatar" width="35" height="35">
        </section>`;

    getElement(): Element {
        const element = this.getTemplate();
        this.setRating(element);
        this.setAvatar(element);
        return element;
    }

    private setRating(element: Element): void {
        if (this.userData.filmsWatched > 0) {
            const ratingElement = document.createElement('p');
            ratingElement.classList.add('profile__rating');
            ratingElement.textContent = this.userData.rank;
            element.insertAdjacentElement('afterbegin', ratingElement);
        }
    }

    private setAvatar(element: Element): void {
        const avatarElement = element.querySelector('.profile__avatar');
        if (avatarElement && avatarElement instanceof HTMLImageElement) {
            avatarElement.src = this.userData.avatar;
        }
    }
}