import AbstractView from '../../ts/abstract-view';
import UserData from '../../ts/types/user-data';

export default class ProfileView extends AbstractView {
    constructor(userData: UserData) {
        super();
        this.userData = userData;
    }

    userData: UserData;

    public get template(): string {
        return `<section class="profile">
                    <img class="profile__avatar" src="${this.userData.avatar}" alt="Avatar" width="35" height="35">
                </section>`;
    }

    public createElement(): Element {
        const element = this.getTemplate();
        this.setRating(element);
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
}
