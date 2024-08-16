import FilmInfo from './film-info';
import UserDetails from './user-details';

export default class Movie {
    constructor(id: string, comments: string[], filmInfo: FilmInfo, userDetails: UserDetails) {
        this.id = id;
        this.comments = comments;
        this.filmInfo = filmInfo;
        this.userDetails = userDetails;
    }

    id: string;
    comments: string[];
    filmInfo: FilmInfo;
    userDetails: UserDetails;
}
