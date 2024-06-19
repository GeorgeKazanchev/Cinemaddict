import FilmsSection from '../types/films-sections/films-section';
import FiltrationCriterionType from '../types/filtration-criterion-type';
import SortCriterionType from '../types/sort-criterion-type';
import UserData from '../types/user-data';

export default class ModelData {
    constructor(filmsSection: FilmsSection, userData: UserData, isAuthorized: boolean,
        selectedFiltrationCriterion: FiltrationCriterionType, selectedSortCriterion: SortCriterionType) {

        this.filmsSection = filmsSection;
        this.userData = userData;
        this.isAuthorized = isAuthorized;
        this.selectedFiltrationCriterion = selectedFiltrationCriterion;
        this.selectedSortCriterion = selectedSortCriterion;
    }

    public filmsSection: FilmsSection;
    public userData: UserData;
    public isAuthorized: boolean;
    public selectedFiltrationCriterion: FiltrationCriterionType;
    public selectedSortCriterion: SortCriterionType;
}
