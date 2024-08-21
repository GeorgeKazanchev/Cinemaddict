import Movie from './movie';

export default class MoviesSyncResponse {
    constructor(films: Movie[]) {
        this.updated = films;
    }

    updated: Movie[];
}
