import AbstractView from '../../ts/abstract-view';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';
import UserData from '../../ts/types/user-data';

export default abstract class MainView extends AbstractView {
    constructor(selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData) {
        super();
        this.selectedFiltrationCriterion = selectedFiltrationCriterion;
        this.userData = userData;
    }

    selectedFiltrationCriterion: FiltrationCriterionType;
    userData: UserData;
    template: string =
        `<main class="main"></main>`;
}
