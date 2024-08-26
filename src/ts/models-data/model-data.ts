import FiltrationType from '../types/filtration-type';
import SortType from '../types/sort-type';
import UserData from '../types/user-data';
import Movie from '../types/movie';
import { FILMS_CHUNK_SIZE } from '../../settings';

export default class ModelData {
    constructor(userData: UserData, films: Movie[] | null = null) {
        this.films = films;
        this.shownFilmsCount = FILMS_CHUNK_SIZE;
        this.userData = userData;
        this.isAuthorized = true;
        this.filtrationSelected = FiltrationType.AllMovies;
        this.sortSelected = SortType.Default;
        this.areFilmsLoaded = false;
        this.isLoadingFailed = false;
    }

    public films: Movie[] | null;
    public shownFilmsCount: number;
    public userData: UserData;
    public isAuthorized: boolean;
    public filtrationSelected: FiltrationType;
    public sortSelected: SortType;
    public areFilmsLoaded: boolean;
    public isLoadingFailed: boolean;
}
