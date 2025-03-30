import { it, describe, expect } from '@jest/globals';
import { Constants } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getEmptyFilm, getFilms } from '../get-films';
import getInitialState from './get-initial-state';

describe('Top rated films getter', () => {
  it('should return an empty array if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });
    expect(model.topRatedFilms).toStrictEqual([]);
  });

  it('should return an empty array if all the films have rating 0', () => {
    const model = new Model({
      ...getInitialState(),
      films: [getEmptyFilm(), getEmptyFilm()],
    });
    expect(model.topRatedFilms).toStrictEqual([]);
  });

  it('should return 1 film if 2 films were passed (one of them has rating 0.0)', () => {
    const filmWithNonZeroRating = getFilms()[0];
    const model = new Model({
      ...getInitialState(),
      films: [filmWithNonZeroRating, getEmptyFilm()],
    });
    expect(model.topRatedFilms).toStrictEqual([filmWithNonZeroRating]);
  });

  it('should return two films have been passed', () => {
    const filmsWithNonZeroRating = getFilms();
    const model = new Model({
      ...getInitialState(),
      films: [filmsWithNonZeroRating[0], filmsWithNonZeroRating[1]],
    });
    expect(model.topRatedFilms).toHaveLength(model.state.films.length);
  });

  it('should return TOP_RATED_FILMS_COUNT', () => {
    const model = new Model({
      ...getInitialState(),
      films: [...getFilms(), ...getFilms(), ...getFilms()],
    });
    expect(model.state.films.length).toBeGreaterThan(Constants.TOP_RATED_FILMS_COUNT);
    expect(model.topRatedFilms).toHaveLength(Constants.TOP_RATED_FILMS_COUNT);
  });
});
