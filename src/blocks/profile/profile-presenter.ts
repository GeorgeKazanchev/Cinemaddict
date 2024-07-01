import Model from '../../ts/models/model';
import UserData from '../../ts/types/user-data';
import ProfileView from './profile-view';

export default class ProfilePresenter {
    constructor(model: Model, userData: UserData) {
        this.model = model;
        this.view = new ProfileView(userData);
    }

    private model: Model;
    private view: ProfileView;

    public render(element: Element): void {
        this.view.element.classList.add('header__profile');
        element.appendChild(this.view.element);
    }

    public updateRating(): void {
        this.view.updateRating();
    }
}
