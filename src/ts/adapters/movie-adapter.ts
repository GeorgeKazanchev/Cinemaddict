import FilmInfoAdapter from './film-info-adapter';
import UserDetailsAdapter from './user-details-adapter';
import Movie from '../types/movie';
import { MovieDto } from '../types/dto';

export default class MovieAdapter {
    public static fromDto(movieDto: MovieDto): Movie {
        return new Movie(
            movieDto['id'],
            movieDto['comments'],
            FilmInfoAdapter.fromDto(movieDto['film_info']),
            UserDetailsAdapter.fromDto(movieDto['user_details'])
        );
    }
}
