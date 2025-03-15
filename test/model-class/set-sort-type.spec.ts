import { it, describe, expect } from '@jest/globals';
import { sortFilms, SortType } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Set sort type', () => {
  it('should correctly set a sort type === SortType.Default', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Default);
    expect(model.state.sortType).toBe(SortType.Default);
    expect(model.sortedFilms).toStrictEqual(model.filteredFilms);
  });

  it('should correctly set a sort type === SortType.Date', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Date);
    const filmsSortedByDate = sortFilms(model.filteredFilms, SortType.Date);
    expect(model.state.sortType).toBe(SortType.Date);
    expect(model.sortedFilms).toStrictEqual(filmsSortedByDate);
  });

  it('should correctly set a sort type === SortType.Rating', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Rating);
    const filmsSortedByRating = sortFilms(model.filteredFilms, SortType.Rating);
    expect(model.state.sortType).toBe(SortType.Rating);
    expect(model.sortedFilms).toStrictEqual(filmsSortedByRating);
  });
});
