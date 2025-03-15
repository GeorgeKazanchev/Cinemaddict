import { it, describe, expect } from '@jest/globals';
import { Constants } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();

describe('Reset shown films', () => {
  it('should reset the films count to FILMS_PORTION_SIZE if there are plenty of films', () => {
    const model = new Model({
      ...getInitialState(),
      films: films.concat(films).concat(films),
      shownFilmsCount: 2 * Constants.FILMS_PORTION_SIZE,
    });

    model.resetShownFilms();
    expect(model.state.shownFilmsCount).toBe(Constants.FILMS_PORTION_SIZE);
    expect(model.shownFilms).toHaveLength(Constants.FILMS_PORTION_SIZE);
  });

  it('should save the films count if there are few films', () => {
    const model = new Model(getInitialState());
    model.resetShownFilms();
    expect(model.state.shownFilmsCount).toBe(model.filteredFilms.length);
    expect(model.shownFilms).toHaveLength(model.filteredFilms.length);
  });

  it('should save 0 if there are no films', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
      shownFilmsCount: 0,
    });

    model.resetShownFilms();
    expect(model.state.shownFilmsCount).toBe(0);
    expect(model.shownFilms).toHaveLength(0);
  });
});
