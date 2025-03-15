import { it, describe, expect } from '@jest/globals';
import { Constants, Filter } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();

describe('Init shown films count getter', () => {
  it('should return FILMS_PORTION_SIZE if the count of films >= FILMS_PORTION_SIZE', () => {
    const model = new Model({
      ...getInitialState(),
      films: films.concat(films).concat(films), //  Увеличиваем кол-во фильмов
    });

    expect(model.initShownFilmsCount).toBe(Constants.FILMS_PORTION_SIZE);
  });

  it('should return the count if films if it < FILMS_PORTION_SIZE', () => {
    const model = new Model(getInitialState());
    const { state } = model;
    expect(model.initShownFilmsCount).toBe(state.films.length);
  });

  it('should correctly deals with all the filters', () => {
    const model = new Model(getInitialState());

    model.setFilter(Filter.Watchlist);
    const filmsInWatchlist = model.state.films.filter((film) => film.userDetails.inWatchlist);
    expect(model.initShownFilmsCount).toBe(filmsInWatchlist.length);

    model.setFilter(Filter.Watched);
    const watchedFilms = model.state.films.filter((film) => film.userDetails.isWatched);
    expect(model.initShownFilmsCount).toBe(watchedFilms.length);

    model.setFilter(Filter.Favorite);
    const favoriteFilms = model.state.films.filter((film) => film.userDetails.isFavorite);
    expect(model.initShownFilmsCount).toBe(favoriteFilms.length);
  });

  it('should return 0 if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });

    model.setFilter(Filter.All);
    expect(model.initShownFilmsCount).toBe(0);

    model.setFilter(Filter.Watchlist);
    expect(model.initShownFilmsCount).toBe(0);

    model.setFilter(Filter.Watched);
    expect(model.initShownFilmsCount).toBe(0);

    model.setFilter(Filter.Favorite);
    expect(model.initShownFilmsCount).toBe(0);
  });
});
