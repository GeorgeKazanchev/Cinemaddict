import ReleaseInfoAdapter from './release-info-adapter';
import FilmInfo from '../../types/film-info';
import { FilmInfoDto } from '../dto';

export default class FilmInfoAdapter {
    public static fromDto(filmInfoDto: FilmInfoDto): FilmInfo {
        return new FilmInfo(
            filmInfoDto['title'],
            filmInfoDto['alternative_title'],
            filmInfoDto['poster'],
            filmInfoDto['director'],
            filmInfoDto['description'],
            filmInfoDto['total_rating'],
            filmInfoDto['age_rating'],
            filmInfoDto['runtime'],
            filmInfoDto['writers'],
            filmInfoDto['actors'],
            filmInfoDto['genre'],
            ReleaseInfoAdapter.fromDto(filmInfoDto['release'])
        );
    }

    public static toDto(filmInfo: FilmInfo): FilmInfoDto {
        return {
            'title': filmInfo.title,
            'alternative_title': filmInfo.alternativeTitle,
            'poster': filmInfo.poster,
            'director': filmInfo.director,
            'description': filmInfo.description,
            'total_rating': filmInfo.totalRating,
            'age_rating': filmInfo.ageRating,
            'runtime': filmInfo.runtime,
            'writers': filmInfo.writers,
            'actors': filmInfo.actors,
            'genre': filmInfo.genre,
            'release': ReleaseInfoAdapter.toDto(filmInfo.release)
        };
    }
}
