import MainNavigationView from './main-navigation-view';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';
import UserData from '../../ts/types/user-data';

export default class MainNavigationFilmsView extends MainNavigationView {
    constructor(selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData) {
        super(userData);
        this.selectedFiltrationCriterion = selectedFiltrationCriterion;
    }

    selectedFiltrationCriterion: FiltrationCriterionType;

    public createElement(): Element {
        const element = super.createElement();
        this.checkSelectedCriterion(element);
        return element;
    }

    public updateSelectedFiltrationCriterion(filtrationCriterion: FiltrationCriterionType): void {
        this.selectedFiltrationCriterion = filtrationCriterion;
        this.uncheckAllCriterions(this.element);
        this.checkSelectedCriterion(this.element);
    }

    public updateWatchlist(): void {
        super.setWatchlist(this.element);
    }

    public updateHistory(): void {
        super.setHistory(this.element);
    }

    public updateFavorites(): void {
        super.setFavorites(this.element);
    }

    private checkSelectedCriterion(element: Element): void {
        const criterionSelector = this.getCriterionSelector(this.selectedFiltrationCriterion);
        const selectedCriterion = element.querySelector(criterionSelector);
        selectedCriterion?.classList.add('main-navigation__item--active');
    }

    private uncheckAllCriterions(element: Element): void {
        const filtrationCriterions = element.querySelectorAll('.main-navigation__item');
        filtrationCriterions.forEach((criterion) => {
            criterion.classList.remove('main-navigation__item--active');
        });
    }
}
