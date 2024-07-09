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
                    ${this.getRatingMarkup()}
                    <img class="profile__avatar" src="${this.userData.avatar}" alt="Avatar" width="35" height="35">
                </section>`;
    }

    public createElement(): Element {
        return this.getTemplate();
    }

    public updateRating(): void {
        const ratingElement = this.element.querySelector('.profile__rating');
        if (ratingElement) {
            ratingElement.textContent = this.userData.rank;
        } else {
            this.element.insertAdjacentHTML('afterbegin', this.getRatingMarkup());
        }
    }

    private getRatingMarkup(): string {
        return this.userData.allFilmsWatched > 0
            ? `<p class="profile__rating">${this.userData.rank}</p>`
            : ``;
    }
}
