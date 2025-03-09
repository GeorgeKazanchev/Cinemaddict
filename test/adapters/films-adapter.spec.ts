import { it, describe, expect } from '@jest/globals';
import FilmsAdapter from '../../src/ts/api/adapters/films-adapter';
import { getDtoTestFilms, getEmptyFilm, getTestFilms } from '../get-test-films';

describe('Films adapter', () => {
  describe('From DTOs', () => {
    it('should return correct films', () => {
      const dtos = getDtoTestFilms().slice(0, 2);
      const expectedFilms = getTestFilms().slice(0, 2);
      expect(FilmsAdapter.fromDtos(dtos)).toStrictEqual(expectedFilms);
    });
  });

  describe('From DTO', () => {
    it('should return a correct film', () => {
      const dto = getDtoTestFilms()[0];
      const expectedFilm = getTestFilms()[0];
      expect(FilmsAdapter.fromDto(dto)).toStrictEqual(expectedFilm);
    });
  });

  describe('To DTO', () => {
    it('should return a correct DTO for the film which have been watched', () => {
      const film = getTestFilms()[0];
      const expectedDto = getDtoTestFilms()[0];
      expect(FilmsAdapter.toDto(film)).toStrictEqual(expectedDto);
    });

    it('should return a correct DTO for the "empty" film', () => {
      const film = getEmptyFilm();
      expect(FilmsAdapter.toDto(film)).toStrictEqual({
        id: '',
        comments: [],
        film_info: {
          title: 'Empty film',
          alternative_title: 'Empty film',
          total_rating: 0.0,
          poster: '',
          age_rating: 0,
          director: '',
          writers: [],
          actors: [],
          release: {
            date: '1939-02-10',
            release_country: '',
          },
          runtime: 0,
          genre: [],
          description: '',
        },
        user_details: {
          watchlist: false,
          already_watched: false,
          watching_date: null,
          favorite: false,
        },
      });
    });
  });
});
