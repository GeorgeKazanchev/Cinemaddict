import Comment from "./comment";

export default class Movie {
    id: string;
    comments: Comment[];

    filmInfo: {
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

        release: {
            date: string;
            releaseCountry: string;
        };
    };

    userDetails: {
        favorite: boolean;
        watchlist: boolean;
        alreadyWatched: boolean;
        watchingDate: string;
    }
}