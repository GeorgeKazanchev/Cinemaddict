export default class UserData {
    constructor(username: string, allFilmsWatched: number, filmsInWatchlist: number, favoriteFilms: number,
        totalDuration: number, topGenres: string[], avatar: string) {
        if (allFilmsWatched < 0 || filmsInWatchlist < 0 || favoriteFilms < 0) {
            throw new RangeError('Number of films can not be negative.');
        }

        this.username = username;
        this.allFilmsWatched = allFilmsWatched;
        this.filmsInWatchlist = filmsInWatchlist;
        this.favoriteFilms = favoriteFilms;
        this.filteredFilmsWatched = allFilmsWatched;
        this.totalDuration = totalDuration;
        this.topGenres = topGenres;
        this.avatar = avatar;
    }

    username: string;
    allFilmsWatched: number;
    filmsInWatchlist: number;
    favoriteFilms: number;
    filteredFilmsWatched: number;
    totalDuration: number;
    topGenres: string[];
    avatar: string;

    get rank(): string {
        if (this.allFilmsWatched === 0) {
            return '';
        } else if (this.allFilmsWatched >= 1 && this.allFilmsWatched <= 10) {
            return 'Novice';
        } else if (this.allFilmsWatched >= 11 && this.allFilmsWatched <= 20) {
            return 'Fan';
        } else if (this.allFilmsWatched >= 21) {
            return 'Movie Buff';
        } else {
            throw new RangeError('User\'s rank can not be received.');
        }
    }
}
