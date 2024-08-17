import FilmInfoAdapter from './film-info-adapter';
import UserDetailsAdapter from './user-details-adapter';
import Movie from '../../types/movie';
import { MovieDto } from '../dto';

export default class MovieAdapter {
    public static fromDto(movieDto: MovieDto): Movie {
        return new Movie(
            movieDto['id'],
            movieDto['comments'],
            FilmInfoAdapter.fromDto(movieDto['film_info']),
            UserDetailsAdapter.fromDto(movieDto['user_details'])
        );
    }

    public static toDto(film: Movie): MovieDto {
        return {
            'id': film.id,
            'comments': film.comments,
            'film_info': FilmInfoAdapter.toDto(film.filmInfo),
            'user_details': UserDetailsAdapter.toDto(film.userDetails)
        };
    }
}
