export default class UserData {
    constructor(username: string, filmsWatched: number, avatar: string) {
        if (filmsWatched < 0) {
            throw new RangeError('Number of the watched films can not be negative.');
        }

        this.username = username;
        this.filmsWatched = filmsWatched;
        this.avatar = avatar;
    }

    username: string;
    filmsWatched: number;
    avatar: string;

    get rank(): string {
        if (this.filmsWatched === 0) {
            return '';
        } else if (this.filmsWatched >= 1 && this.filmsWatched <= 10) {
            return 'Novice';
        } else if (this.filmsWatched >= 11 && this.filmsWatched <= 20) {
            return 'Fan';
        } else if (this.filmsWatched >= 21) {
            return 'Movie Buff';
        } else {
            throw new RangeError('User\'s rank can not be received.');
        }
    }
}
