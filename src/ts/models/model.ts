import ModelData from '../models-data/model-data';
import FilmsSection from '../types/films-sections/films-section';
import Movie from '../types/movie';
import SortCriterionType from '../types/sort-criterion-type';
import FiltrationCriterionType from '../types/filtration-criterion-type';
import UserData from '../types/user-data';

export default class Model {
    constructor(data: ModelData) {
        this.data = data;
    }

    private data: ModelData;

    public get filmsSection(): FilmsSection {
        return this.data.filmsSection;
    }

    public get filmsCount(): number {
        return this.data.filmsSection.films?.length ?? 0;
    }

    public get userData(): UserData {
        return this.data.userData;
    }

    public get isAuthorized(): boolean {
        return this.data.isAuthorized;
    }

    public get selectedFiltrationCriterion(): FiltrationCriterionType {
        return this.data.selectedFiltrationCriterion;
    }

    public set selectedFiltrationCriterion(filtrationCriterion: FiltrationCriterionType) {
        this.data.selectedFiltrationCriterion = filtrationCriterion;
    }

    public get selectedSortCriterion(): SortCriterionType {
        return this.data.selectedSortCriterion;
    }

    public incrementFilmsWatched(): void {
        ++this.data.userData.filmsWatched;
    }

    public incrementFilmsInWatchlist(): void {
        ++this.data.userData.filmsInWatchlist;
    }

    public incrementFavoriteFilms(): void {
        ++this.data.userData.favoriteFilms;
    }

    public decrementFilmsWatched(): void {
        if (this.data.userData.filmsWatched > 0) {
            --this.data.userData.filmsWatched;
        }
    }

    public decrementFilmsInWatchlist(): void {
        if (this.data.userData.filmsInWatchlist > 0) {
            --this.data.userData.filmsInWatchlist;
        }
    }

    public decrementFavoriteFilms(): void {
        if (this.data.userData.favoriteFilms > 0) {
            --this.data.userData.favoriteFilms;
        }
    }
}
