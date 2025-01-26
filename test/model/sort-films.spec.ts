import { it, describe, expect } from '@jest/globals';
import SortType from '../../src/ts/model/enums/sort-type';
import sortFilms from '../../src/ts/model/sort-films';
import { getTestFilms } from '../get-test-films';

describe('Sort films function', () => {
  it('should return an empty array if the same one was passed', () => {
    expect(sortFilms([], SortType.Default)).toHaveLength(0);
  });

  it('should not mutate an initial array', () => {
    const films = getTestFilms();
    const sortedFilms = sortFilms(films, SortType.Default);
    expect(sortedFilms).not.toBe(films);
  });

  it('should return a copy of the initial array if the sortType === Default', () => {
    const films = getTestFilms();
    const sortedFilms = sortFilms(films, SortType.Default);

    expect(sortedFilms).toHaveLength(films.length);
    for (let i = 0; i < sortedFilms.length; ++i) {
      expect(sortedFilms[i].id).toBe(films[i].id);
    }
  });

  it('should correctly sort by date', () => {
    const films = getTestFilms();
    const sortedFilms = sortFilms(films, SortType.Date);

    for (let i = 0; i < sortedFilms.length - 1; ++i) {
      expect(sortedFilms[i].info.release.date >= sortedFilms[i + 1].info.release.date).toBe(true);
    }
  });

  it('should correctly sort by rating', () => {
    const films = getTestFilms();
    const sortedFilms = sortFilms(films, SortType.Rating);

    for (let i = 0; i < sortFilms.length - 1; ++i) {
      expect(sortedFilms[i].info.rating).toBeGreaterThanOrEqual(sortedFilms[i + 1].info.rating);
    }
  });
});
