import MainNavigationView from './main-navigation-view';
import FiltrationType from '../../ts/types/filtration-type';
import UserData from '../../ts/types/user-data';

export default class MainNavigationFilmsView extends MainNavigationView {
    constructor(filtrationSelected: FiltrationType, userData: UserData) {
        super(userData);
        this.filtrationSelected = filtrationSelected;
    }

    filtrationSelected: FiltrationType;

    public createElement(): Element {
        const element = super.createElement();
        this.checkSelectedCriterion(element);
        return element;
    }

    public bind(): void {
        const filtrationButtons = this.element.querySelectorAll('.main-navigation__item');
        filtrationButtons.forEach((button) => {
            button.addEventListener('click', (evt: Event) => this.buttonClickHandler(evt));
        });

        const statsButton = this.element.querySelector('.main-navigation__additional');
        statsButton?.addEventListener('click', (evt: Event) => this.statsButtonClickHandler(evt));
    }

    public buttonClickHandler(_: Event): void { }
    public statsButtonClickHandler(_: Event): void { }

    public updateSelectedFiltrationCriterion(filtrationCriterion: FiltrationType): void {
        this.filtrationSelected = filtrationCriterion;
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
        const criterionSelector = this.getCriterionSelector(this.filtrationSelected);
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
