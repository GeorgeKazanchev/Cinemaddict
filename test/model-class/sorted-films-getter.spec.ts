import { it, describe, expect } from '@jest/globals';
import { sortFilms, SortType } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Sorted films getter', () => {
  it('should return the films in the init order if the default sort type set', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Default);
    expect(model.sortedFilms).toStrictEqual(model.filteredFilms);
  });

  it('should correctly sort by date', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Date);
    const filmsSortedByDate = sortFilms(model.filteredFilms, SortType.Date);
    expect(model.sortedFilms).toStrictEqual(filmsSortedByDate);
  });

  it('should correctly sort by rating', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Rating);
    const filmsSortedByRating = sortFilms(model.filteredFilms, SortType.Rating);
    expect(model.sortedFilms).toStrictEqual(filmsSortedByRating);
  });

  it('should return a new array when sorting', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Date);
    expect(model.sortedFilms).not.toBe(model.filteredFilms);
  });
});
