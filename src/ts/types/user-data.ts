export default class UserData {
    constructor(username: string, avatar: string) {
        this.username = username;
        this.avatar = avatar;
        this.allFilmsWatched = 0;
        this.filmsInWatchlist = 0;
        this.favoriteFilms = 0;
    }

    public username: string;
    public avatar: string;
    public allFilmsWatched: number;
    public filmsInWatchlist: number;
    public favoriteFilms: number;

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
