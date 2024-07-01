import Model from '../../ts/models/model';
import UserData from '../../ts/types/user-data';
import ProfilePresenter from '../profile/profile-presenter';
import HeaderView from './header-view';

export default class HeaderPresenter {
    constructor(model: Model, isAuthorized: boolean, userData: UserData) {
        this.model = model;
        this.view = new HeaderView(isAuthorized, userData);
        this.profilePresenter = new ProfilePresenter(model, userData);
    }

    private model: Model;
    private view: HeaderView;
    private profilePresenter: ProfilePresenter;

    public get element(): Element {
        return Object.freeze(this.view.element);
    }

    public render(element: Element): void {
        if (this.view.isAuthorized && this.view.userData) {
            this.profilePresenter.render(this.view.element);
        }
        element.appendChild(this.view.element);
    }

    public updateUserRating(): void {
        this.profilePresenter.updateRating();
    }
}
