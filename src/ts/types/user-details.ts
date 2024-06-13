export default class UserDetails {
    constructor(favorite: boolean, watchlist: boolean, alreadyWatched: boolean, watchingDate: string | null) {
        this.favorite = favorite;
        this.watchlist = watchlist;
        this.alreadyWatched = alreadyWatched;
        this.watchingDate = watchingDate;
    }

    favorite: boolean;
    watchlist: boolean;
    alreadyWatched: boolean;
    watchingDate: string | null;
}
