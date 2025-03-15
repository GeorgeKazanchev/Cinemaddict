import { it, describe, expect } from '@jest/globals';
import { Constants, Filter } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();

const areShownFilmsEqualToFiltered = (model: Model) => {
  expect(model.shownFilms).toStrictEqual(model.filteredFilms);
};

describe('Shown films getter', () => {
  it('should return the count of the films when it is < FILMS_PORTION_SIZE', () => {
    const model = new Model(getInitialState());

    model.setFilter(Filter.All);
    areShownFilmsEqualToFiltered(model);

    model.setFilter(Filter.Watchlist);
    areShownFilmsEqualToFiltered(model);

    model.setFilter(Filter.Watched);
    areShownFilmsEqualToFiltered(model);

    model.setFilter(Filter.Favorite);
    areShownFilmsEqualToFiltered(model);
  });

  it('should return the FILMS_PORTION_SIZE films when it is less than the count of the films', () => {
    const model = new Model({
      ...getInitialState(),
      films: films.concat(films).concat(films),
      shownFilmsCount: Constants.FILMS_PORTION_SIZE,
    });

    const expectedFilms = model.filteredFilms.slice(0, Constants.FILMS_PORTION_SIZE);
    expect(model.shownFilms).toHaveLength(Constants.FILMS_PORTION_SIZE);
    expect(model.shownFilms).toStrictEqual(expectedFilms);
  });

  it('should return an empty array if the count of the films === 0', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
      shownFilmsCount: 0,
    });
    expect(model.shownFilms).toStrictEqual([]);
  });
});
