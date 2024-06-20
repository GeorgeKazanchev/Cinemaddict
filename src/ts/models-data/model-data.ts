import FiltrationCriterionType from '../types/filtration-criterion-type';
import SortCriterionType from '../types/sort-criterion-type';
import UserData from '../types/user-data';
import Movie from '../types/movie';

export default class ModelData {
    constructor(films: Movie[] | null, shownFilmsCount: number, userData: UserData, isAuthorized: boolean,
        selectedFiltrationCriterion: FiltrationCriterionType, selectedSortCriterion: SortCriterionType) {

        this.films = films;
        this.shownFilmsCount = shownFilmsCount;
        this.userData = userData;
        this.isAuthorized = isAuthorized;
        this.selectedFiltrationCriterion = selectedFiltrationCriterion;
        this.selectedSortCriterion = selectedSortCriterion;
    }

    public films: Movie[] | null;
    public shownFilmsCount: number;
    public userData: UserData;
    public isAuthorized: boolean;
    public selectedFiltrationCriterion: FiltrationCriterionType;
    public selectedSortCriterion: SortCriterionType;
}
