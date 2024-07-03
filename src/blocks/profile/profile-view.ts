import AbstractView from '../../ts/abstract-view';
import UserData from '../../ts/types/user-data';

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

    public createElement(): Element {
        const element = this.getTemplate();
        this.setRating(element);
        this.setAvatar(element);
        return element;
    }

    public updateRating(): void {
        const ratingElement = this.element.querySelector('.profile__rating');
        if (ratingElement) {
            ratingElement.textContent = this.userData.rank;
        } else {
            this.setRating(this.element);
        }
    }

    private setRating(element: Element): void {
        if (this.userData.allFilmsWatched > 0) {
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
