import FiltrationType from '../types/filtration-type';
import SortType from '../types/sort-type';
import UserData from '../types/user-data';
import Movie from '../types/movie';

export default class ModelData {
    constructor(films: Movie[] | null, shownFilmsCount: number, userData: UserData, isAuthorized: boolean,
        filtrationSelected: FiltrationType, sortSelected: SortType) {

        this.films = films;
        this.shownFilmsCount = shownFilmsCount;
        this.userData = userData;
        this.isAuthorized = isAuthorized;
        this.filtrationSelected = filtrationSelected;
        this.sortSelected = sortSelected;
    }

    public films: Movie[] | null;
    public shownFilmsCount: number;
    public userData: UserData;
    public isAuthorized: boolean;
    public filtrationSelected: FiltrationType;
    public sortSelected: SortType;
}
