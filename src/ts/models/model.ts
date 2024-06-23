import ModelData from '../models-data/model-data';
import Movie from '../types/movie';
import SortCriterionType from '../types/sort-criterion-type';
import FiltrationCriterionType from '../types/filtration-criterion-type';
import UserData from '../types/user-data';
import { FILMS_CHUNK_SIZE } from '../../settings';

export default class Model {
    constructor(data: ModelData) {
        this.data = data;
    }

    private data: ModelData;

    public get modelData(): ModelData {
        return this.data;
    }

    public get allFilms(): Movie[] {
        return this.data.films ?? [];
    }

    public get filmsInWatchlist(): Movie[] {
        return this.data.films?.filter((film) => film.userDetails.watchlist) ?? [];
    }

    public get watchedFilms(): Movie[] {
        return this.data.films?.filter((film) => film.userDetails.alreadyWatched) ?? [];
    }

    public get favoriteFilms(): Movie[] {
        return this.data.films?.filter((film) => film.userDetails.favorite) ?? [];
    }

    public get filteredFilms(): Movie[] {
        switch (this.selectedFiltrationCriterion) {
            case FiltrationCriterionType.AllMovies: {
                return this.allFilms;
            }
            case FiltrationCriterionType.Watchlist: {
                return this.filmsInWatchlist;
            }
            case FiltrationCriterionType.History: {
                return this.watchedFilms;
            }
            case FiltrationCriterionType.Favorites: {
                return this.favoriteFilms;
            }
        }
    }

    public get sortedFilms(): Movie[] {
        switch (this.selectedSortCriterion) {
            case SortCriterionType.Default: {
                return this.filteredFilms;
            }
            case SortCriterionType.Date: {
                return [...this.filteredFilms].sort((a, b) => {
                    return new Date(b.filmInfo.release.date).getTime() > new Date(a.filmInfo.release.date).getTime() ? 1 : -1;
                });
            }
            case SortCriterionType.Rating: {
                return [...this.filteredFilms].sort((a, b) => {
                    return b.filmInfo.totalRating - a.filmInfo.totalRating;
                });
            }
        }
    }

    public get shownFilms(): Movie[] {
        return this.sortedFilms.slice(0, this.data.shownFilmsCount);
    }

    public get allFilmsShown(): boolean {
        return this.shownFilms.length === this.sortedFilms.length;
    }

    public get allFilmsCount(): number {
        return this.allFilms.length;
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

    public set selectedSortCriterion(sortCriterion: SortCriterionType) {
        this.data.selectedSortCriterion = sortCriterion;
    }

    public increaseShownFilmsCount(): void {
        const filmsLeft = this.allFilms.length - this.shownFilms.length;
        this.data.shownFilmsCount += Math.min(FILMS_CHUNK_SIZE, filmsLeft);
    }

    public resetShownFilmsCount(): void {
        this.data.shownFilmsCount = FILMS_CHUNK_SIZE;
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

    public getWatchedFilmsSince(date: Date): Movie[] {
        return this.watchedFilms.filter((film) => {
            if (film.userDetails.watchingDate) {
                return film.userDetails.watchingDate >= date;
            }
        })
    }

    public getFilmsCount(films: Movie[]): number {
        return films.length;
    }

    public getTotalDuration(films: Movie[]): number {
        let totalDuration = 0;
        films.forEach((film) => {
            totalDuration += film.filmInfo.runtime;
        });
        return totalDuration;
    }

    public getFavoriteGenres(films: Movie[]): string[] {
        let favoriteGenres = [];
        const genresCountMap = this.getGenresCountMap(films);

        const largestFilmsOfGenre = Math.max(...genresCountMap.values());
        for (let [key, value] of genresCountMap.entries()) {
            if (value === largestFilmsOfGenre) {
                favoriteGenres.push(key);
            }
        }

        return favoriteGenres;
    }

    public getGenresCountMap(films: Movie[]): Map<string, number> {
        const genresCountMap = new Map<string, number>();
        films.forEach((film) => {
            film.filmInfo.genre.forEach((genre) => {
                const prevFilmsCount = genresCountMap.get(genre) ?? 0;
                genresCountMap.set(genre, prevFilmsCount + 1);
            });
        });
        return genresCountMap;
    }
}
