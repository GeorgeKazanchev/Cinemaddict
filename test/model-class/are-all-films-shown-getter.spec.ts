import { it, describe, expect } from '@jest/globals';
import { Constants } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();

describe('Are all films shown getter', () => {
  it('should return true if all the films are shown', () => {
    const model = new Model(getInitialState()); //  В начальном состоянии все фильмы показаны
    expect(model.areAllFilmsShown).toBe(true);
  });

  it('should return false if not all the films are shown', () => {
    const model = new Model({
      ...getInitialState(),
      films: films.concat(films).concat(films),
      shownFilmsCount: Constants.FILMS_PORTION_SIZE,
    });
    expect(model.areAllFilmsShown).toBe(false);
  });

  it('should return true if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
      shownFilmsCount: 0,
    });
    expect(model.areAllFilmsShown).toBe(true);
  });
});
