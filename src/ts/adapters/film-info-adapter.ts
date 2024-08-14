import ReleaseInfoAdapter from './release-info-adapter';
import FilmInfo from '../types/film-info';
import { FilmInfoDto } from '../types/dto';

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
}
