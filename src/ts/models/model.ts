import ModelData from '../models-data/model-data';
import Movie from '../types/movie';
import SortType from '../types/sort-type';
import FiltrationType from '../types/filtration-type';
import UserData from '../types/user-data';
import { FILMS_CHUNK_SIZE } from '../../settings';
import { StatisticsData } from '../types/statistics-data';

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
        switch (this.filtrationSelected) {
            case FiltrationType.AllMovies: {
                return this.allFilms;
            }
            case FiltrationType.Watchlist: {
                return this.filmsInWatchlist;
            }
            case FiltrationType.History: {
                return this.watchedFilms;
            }
            case FiltrationType.Favorites: {
                return this.favoriteFilms;
            }
            default: {
                throw new Error('Given filtration criterion is not supported.');
            }
        }
    }

    public get sortedFilms(): Movie[] {
        switch (this.sortSelected) {
            case SortType.Default: {
                return this.filteredFilms;
            }
            case SortType.Date: {
                return [...this.filteredFilms].sort((a, b) => {
                    return new Date(b.filmInfo.release.date).getTime() > new Date(a.filmInfo.release.date).getTime() ? 1 : -1;
                });
            }
            case SortType.Rating: {
                return [...this.filteredFilms].sort((a, b) => {
                    return b.filmInfo.totalRating - a.filmInfo.totalRating;
                });
            }
            default: {
                throw new Error('Given sort criterion is not supported.');
            }
        }
    }

    public get shownFilms(): Movie[] {
        return this.sortedFilms.slice(0, this.data.shownFilmsCount);
    }

    public get areAllFilmsShown(): boolean {
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

    public get filtrationSelected(): FiltrationType {
        return this.data.filtrationSelected;
    }

    public set filtrationSelected(filtrationType: FiltrationType) {
        this.data.filtrationSelected = filtrationType;
    }

    public get sortSelected(): SortType {
        return this.data.sortSelected;
    }

    public set sortSelected(sortType: SortType) {
        this.data.sortSelected = sortType;
    }

    public get areFilmsLoaded(): boolean {
        return this.data.areFilmsLoaded;
    }

    public increaseShownFilmsCount(): void {
        const filmsLeft = this.allFilms.length - this.shownFilms.length;
        this.data.shownFilmsCount += Math.min(FILMS_CHUNK_SIZE, filmsLeft);
    }

    public resetShownFilmsCount(): void {
        this.data.shownFilmsCount = FILMS_CHUNK_SIZE;
    }

    public incrementFilmsWatched(): void {
        ++this.data.userData.allFilmsWatched;
    }

    public incrementFilmsInWatchlist(): void {
        ++this.data.userData.filmsInWatchlist;
    }

    public incrementFavoriteFilms(): void {
        ++this.data.userData.favoriteFilms;
    }

    public decrementFilmsWatched(): void {
        if (this.data.userData.allFilmsWatched > 0) {
            --this.data.userData.allFilmsWatched;
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

    public getTotalDuration(films: Movie[]): number {
        return films.reduce(
            (totalDuration: number, film: Movie) => totalDuration += film.filmInfo.runtime, 0
        );
    }

    public getFavoriteGenres(films: Movie[]): string[] {
        const favoriteGenres = [];
        const genresDataMap = this.getGenresDataMap(films);

        const largestFilmsOfGenre = Math.max(...genresDataMap.values());
        for (const [key, value] of genresDataMap.entries()) {
            if (value === largestFilmsOfGenre) {
                favoriteGenres.push(key);
            }
        }

        return favoriteGenres;
    }

    public getGenresDataMap(films: Movie[]): Map<string, number> {
        const genresDataMap = new Map<string, number>();
        films.forEach((film) => {
            film.filmInfo.genre.forEach((genre) => {
                const prevFilmsCount = genresDataMap.get(genre) ?? 0;
                genresDataMap.set(genre, prevFilmsCount + 1);
            });
        });
        return genresDataMap;
    }

    public getStatisticsData(startDate: Date): StatisticsData {
        const watchedFilms = this.getWatchedFilmsSince(startDate);

        const watchedFilmsCount = watchedFilms.length;
        const totalDuration = this.getTotalDuration(watchedFilms);
        const favoriteGenres = this.getFavoriteGenres(watchedFilms);

        return {
            watchedFilmsCount,
            totalDuration,
            favoriteGenres
        };
    }

    public updateUserData(): void {
        this.data.userData.allFilmsWatched = this.watchedFilms.length;
        this.data.userData.filmsInWatchlist = this.filmsInWatchlist.length;
        this.data.userData.favoriteFilms = this.favoriteFilms.length;
    }
}
