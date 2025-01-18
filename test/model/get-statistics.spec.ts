import { it, describe, expect } from '@jest/globals';
import getMinDate from '../../src/ts/model/get-min-date';

import {
  getWatchedFilmsSince,
  getTotalDuration,
  getFilmsCountByGenres,
  getFavoriteGenre,
} from '../../src/ts/model/get-statistics';

import { getEmptyFilm, getTestFilms } from '../get-test-films';

const films = getTestFilms();
const emptyFilm = getEmptyFilm();

describe('Get watched films function', () => {
  it('should return 0 films if the init one is empty', () => {
    expect(getWatchedFilmsSince(getMinDate(), [])).toHaveLength(0);
  });

  it('should return a film which is in the range', () => {
    expect(getWatchedFilmsSince(new Date(2024, 0, 1), films)).toHaveLength(2);
  });

  it('should return all the films if they are in the range', () => {
    expect(getWatchedFilmsSince(getMinDate(), films)).toHaveLength(films.length);
  });

  it('should return 0 films if all the films are out of range', () => {
    expect(getWatchedFilmsSince(new Date(2025, 0, 1), films)).toHaveLength(0);
  });
});

describe('Get total duration function', () => {
  it('should return 0 if the init list is empty', () => {
    expect(getTotalDuration([])).toEqual(0);
  });

  it('should correctly return a non-zero total duration', () => {
    expect(getTotalDuration([films[0]])).toEqual(119);
    expect(getTotalDuration([films[0], films[1]])).toEqual(211);
  });
});

describe('Get films count by genres', () => {
  it('should return an empty map if the init array is empty', () => {
    expect(getFilmsCountByGenres([]).size).toEqual(0);
  });

  it('should return a correct map if 1 film was passed', () => {
    const genresToFilmsCount = getFilmsCountByGenres([films[0]]);
    genresToFilmsCount.forEach((filmsCount, genre) => {
      expect(films[0].info.genres.includes(genre)).toBe(true);
      expect(filmsCount).toEqual(1);
    });
  });

  it('should return a correct map if > 1 films were passed', () => {
    const genresToFilmsCount = getFilmsCountByGenres(films);
    genresToFilmsCount.forEach((filmsCount, genre) => {
      const isGenreExists = films.some(({ info: { genres } }) => (
        genres.includes(genre)
      ));

      expect(isGenreExists).toBe(true);
      expect(filmsCount).toBeGreaterThanOrEqual(1);
      expect(filmsCount).toBeLessThanOrEqual(films.length);
    });
  });
});

describe('Get favorite genre', () => {
  it('should throw an error if an empty array was passed', () => {
    expect(() => getFavoriteGenre([])).toThrowError();
  });

  it('should throw an error if there are no genres in the films', () => {
    expect(() => getFavoriteGenre([emptyFilm])).toThrowError();
  });

  it('should correctly return a genre if 1 film was passed', () => {
    const favoriteGenre = getFavoriteGenre([films[0]]);
    expect(films[0].info.genres.includes(favoriteGenre));
  });
});
