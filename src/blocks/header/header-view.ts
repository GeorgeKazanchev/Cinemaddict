import AbstractView from '../../ts/abstract-view';
import ProfileView from '../profile/profile-view';
import Model from '../../ts/models/model';

export default class HeaderView extends AbstractView {
    constructor(model: Model) {
        super();
        this.model = model;
    }

    model: Model;
    template: string =
        `<header class="header">
            <h1 class="header__logo logo">Cinemaddict</h1>
        </header>`;

    createElement(): Element {
        const element = this.getTemplate();
        if (this.model.isAuthorized && this.model.userData !== null) {  //  TODO: Make it simpler
            const profileView = new ProfileView(this.model.userData);
            const profileElement = profileView.element;
            profileElement.classList.add('header__profile');
            element.appendChild(profileElement);
        }
        return element;
    }
}
