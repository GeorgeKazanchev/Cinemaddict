import { it, describe, expect } from '@jest/globals';
import { Constants } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();

describe('Increase shown films', () => {
  it('should increase the shown films by FILMS_PORTION_SIZE if there are plenty of films', () => {
    const model = new Model({
      ...getInitialState(),
      films: films.concat(films).concat(films).concat(films),
      shownFilmsCount: Constants.FILMS_PORTION_SIZE,
    });

    model.increaseShownFilms();
    expect(model.state.shownFilmsCount).toBe(2 * Constants.FILMS_PORTION_SIZE);
    expect(model.shownFilms).toHaveLength(2 * Constants.FILMS_PORTION_SIZE);
  });

  it('should increase the shown films by the rest films count', () => {
    const model = new Model({
      ...getInitialState(),
      films: films.concat(films), //  Films count > FILMS_PORTION_SIZE && < 2 * FILMS_PORTION_SIZE
      shownFilmsCount: Constants.FILMS_PORTION_SIZE,
    });

    model.increaseShownFilms();
    expect(model.state.shownFilmsCount).toBe(model.filteredFilms.length);
    expect(model.shownFilms).toHaveLength(model.filteredFilms.length);
  });

  it('should not increase the shown films if there are few films', () => {
    const model = new Model(getInitialState());
    model.increaseShownFilms();
    expect(model.state.shownFilmsCount).toBe(model.filteredFilms.length);
    expect(model.shownFilms).toHaveLength(model.filteredFilms.length);
  });

  it('should not increase the shown films if there are no films', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
      shownFilmsCount: 0,
    });

    model.increaseShownFilms();
    expect(model.state.shownFilmsCount).toBe(0);
    expect(model.shownFilms).toHaveLength(0);
  });
});
