import { Film } from '../../model';
import type FilmDto from '../types/film-dto';

export default class FilmsAdapter {
  public static fromDtos(dtos: FilmDto[]): Film[] {
    return dtos.map((dto) => FilmsAdapter.fromDto(dto));
  }

  public static fromDto(dto: FilmDto): Film {
    const { film_info: info, user_details: userDetails } = dto;
    const { release } = info;

    return {
      id: dto.id,
      commentsIds: dto.comments,
      info: {
        actors: info.actors,
        ageRating: info.age_rating,
        alternativeTitle: info.alternative_title,
        description: info.description,
        director: info.director,
        durationMinutes: info.runtime,
        genres: info.genre,
        posterSrc: info.poster,
        rating: info.total_rating,
        release: {
          country: release.release_country,
          date: new Date(release.date),
        },
        title: info.title,
        writers: info.writers,
      },
      userDetails: {
        inWatchlist: userDetails.watchlist,
        isFavorite: userDetails.favorite,
        isWatched: userDetails.already_watched,
        watchingDate: userDetails.watching_date
          ? new Date(userDetails.watching_date)
          : null,
      },
    };
  }

  public static toDto(film: Film): FilmDto {
    const { info, userDetails } = film;

    return {
      id: film.id,
      comments: film.commentsIds,
      film_info: {
        title: info.title,
        alternative_title: info.alternativeTitle,
        total_rating: info.rating,
        poster: info.posterSrc,
        age_rating: info.ageRating,
        director: info.director,
        writers: info.writers,
        actors: info.actors,
        release: {
          date: info.release.date.toISOString().slice(0, 10), //  Берём только дату, без времени
          release_country: info.release.country,
        },
        runtime: info.durationMinutes,
        genre: info.genres,
        description: info.description,
      },
      user_details: {
        watchlist: userDetails.inWatchlist,
        already_watched: userDetails.isWatched,
        watching_date: userDetails.watchingDate?.toISOString() ?? null,
        favorite: userDetails.isFavorite,
      },
    };
  }
}
