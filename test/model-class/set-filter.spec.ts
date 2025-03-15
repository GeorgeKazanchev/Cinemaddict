import { it, describe, expect } from '@jest/globals';
import { Filter } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getEmptyFilm } from '../get-films';
import getInitialState from './get-initial-state';

describe('Set filter', () => {
  it('should correctly set a filter === Filter.All', () => {
    const model = new Model(getInitialState());
    model.setFilter(Filter.All);
    expect(model.state.filter).toBe(Filter.All);
    expect(model.filteredFilms).toStrictEqual(model.state.films);
  });

  it('should correctly set a filter === Filter.Watchlist', () => {
    const model = new Model(getInitialState());
    model.setFilter(Filter.Watchlist);
    expect(model.state.filter).toBe(Filter.Watchlist);
    expect(model.filteredFilms.length).toBeLessThan(model.state.films.length);
  });

  it('should correctly set a filter === Filter.Watched', () => {
    // Добавляю "пустой", непросмотренный фильм, т.к. изначально все фильмы - просмотренные
    const initialState = getInitialState();
    initialState.films.push(getEmptyFilm());

    const model = new Model(initialState);
    model.setFilter(Filter.Watched);

    expect(model.state.filter).toBe(Filter.Watched);
    expect(model.filteredFilms.length).toBeLessThan(model.state.films.length);
  });

  it('should correctly set a filter === Filter.Favorite', () => {
    const model = new Model(getInitialState());
    model.setFilter(Filter.Favorite);
    expect(model.state.filter).toBe(Filter.Favorite);
    expect(model.filteredFilms.length).toBeLessThan(model.state.films.length);
  });
});
