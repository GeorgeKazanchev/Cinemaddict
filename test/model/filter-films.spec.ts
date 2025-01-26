import { it, describe, expect } from '@jest/globals';
import Filter from '../../src/ts/model/enums/filter';
import filterFilms from '../../src/ts/model/filter-films';
import { getTestFilms } from '../get-test-films';

describe('Filter films function', () => {
  it('should return an empty array if the same one was passed', () => {
    expect(filterFilms([], Filter.All)).toHaveLength(0);
  });

  it('should not mutate an initial array', () => {
    const films = getTestFilms();
    const filteredFilms = filterFilms(films, Filter.All);
    expect(filteredFilms).not.toBe(films);
  });

  it('should return all the films if the filter === All', () => {
    const films = getTestFilms();
    const filteredFilms = filterFilms(films, Filter.All);

    expect(filteredFilms).toHaveLength(films.length);
    filteredFilms.forEach((film) => {
      expect(films.includes(film)).toBe(true);
    });
  });

  it('should correctly filter the films in the watchlist', () => {
    expect(filterFilms(getTestFilms(), Filter.Watchlist)).toHaveLength(1);
  });

  it('should correctly filter the watched films', () => {
    expect(filterFilms(getTestFilms(), Filter.Watched)).toHaveLength(3);
  });

  it('should correctly filter the favorite films', () => {
    expect(filterFilms(getTestFilms(), Filter.Favorite)).toHaveLength(2);
  });
});
