import MainView from './main-view';
import UserData from '../../ts/types/user-data';

export default class MainStatisticsView extends MainView {
    constructor(userData: UserData) {
        super(userData);
    }

    createElement(): Element {
        const element = this.getTemplate();
        return element;
    }
}
