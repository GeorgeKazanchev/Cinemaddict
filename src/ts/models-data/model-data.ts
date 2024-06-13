import FilmsSection from '../types/films-sections/films-section';
import NavigationItem from '../types/navigation-items/navigation-item';
import SortCriterionType from '../types/sort-criterion-type';
import UserData from '../types/user-data';

export default class ModelData {
    constructor(filmsSection: FilmsSection, userData: UserData, isAuthorized: boolean, selectedNavigationItem: NavigationItem,
        selectedSortCriterion: SortCriterionType) {
        this.filmsSection = filmsSection;
        this.userData = userData;
        this.isAuthorized = isAuthorized;
        this.selectedNavigationItem = selectedNavigationItem;
        this.selectedSortCriterion = selectedSortCriterion;
    }

    public filmsSection: FilmsSection;
    public userData: UserData;
    public isAuthorized: boolean;
    public selectedNavigationItem: NavigationItem;
    public selectedSortCriterion: SortCriterionType;
}
