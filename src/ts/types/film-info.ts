import ReleaseInfo from './release-info';

export default class FilmInfo {
    constructor(title: string, alternativeTitle: string, poster: string, director: string,
        description: string, totalRating: number, ageRating: number, runtime: number,
        writers: string[], actors: string[], genre: string[], release: ReleaseInfo) {
        this.title = title;
        this.alternativeTitle = alternativeTitle;
        this.poster = poster;
        this.director = director;
        this.description = description;
        this.totalRating = totalRating;
        this.ageRating = ageRating;
        this.runtime = runtime;
        this.writers = writers;
        this.actors = actors;
        this.genre = genre;
        this.release = release;
    }

    title: string;
    alternativeTitle: string;
    poster: string;
    director: string;
    description: string;
    totalRating: number;
    ageRating: number;
    runtime: number;
    writers: string[];
    actors: string[];
    genre: string[];
    release: ReleaseInfo;
}