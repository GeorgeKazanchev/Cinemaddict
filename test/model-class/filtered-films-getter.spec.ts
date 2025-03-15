import { it, describe, expect } from '@jest/globals';
import { Filter } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getEmptyFilm } from '../get-films';
import getInitialState from './get-initial-state';

describe('Filtered films getter', () => {
  it('should return all the films if the filter === Filter.All', () => {
    const model = new Model(getInitialState());
    model.setFilter(Filter.All);
    expect(model.filteredFilms).toStrictEqual(model.state.films);
  });

  it('should correctly filter the films in watchlist', () => {
    const model = new Model(getInitialState());
    model.setFilter(Filter.Watchlist);
    expect(model.filteredFilms.length).toBeLessThan(model.state.films.length);
    expect(model.filteredFilms.every((film) => film.userDetails.inWatchlist)).toBe(true);
  });

  it('should correctly filter the watched films', () => {
    // Добавляю "пустой", непросмотренный фильм, т.к. изначально все фильмы - просмотренные
    const initialState = getInitialState();
    initialState.films.push(getEmptyFilm());

    const model = new Model(initialState);
    model.setFilter(Filter.Watched);

    expect(model.filteredFilms.length).toBeLessThan(initialState.films.length);
    expect(model.filteredFilms
      .every((film) => film.userDetails.isWatched && film.userDetails.watchingDate)).toBe(true);
  });

  it('should correctly filter the favorite films', () => {
    const model = new Model(getInitialState());
    model.setFilter(Filter.Favorite);
    expect(model.filteredFilms.length).toBeLessThan(model.state.films.length);
    expect(model.filteredFilms.every((film) => film.userDetails.isFavorite)).toBe(true);
  });

  it('should return 0 films if no films were passed to the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });

    model.setFilter(Filter.All);
    expect(model.filteredFilms).toHaveLength(0);

    model.setFilter(Filter.Watchlist);
    expect(model.filteredFilms).toHaveLength(0);

    model.setFilter(Filter.Watched);
    expect(model.filteredFilms).toHaveLength(0);

    model.setFilter(Filter.Favorite);
    expect(model.filteredFilms).toHaveLength(0);
  });
});
