import Movie from './movie';
import Comment from './comment';

export default class CommentCreationResponse {
    constructor(film: Movie, comments: Comment[]) {
        this.film = film;
        this.comments = comments;
    }

    film: Movie;
    comments: Comment[];
}
