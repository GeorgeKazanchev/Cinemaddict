import { it, describe, expect } from '@jest/globals';
import { Constants } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getEmptyFilm, getFilms } from '../get-films';
import getInitialState from './get-initial-state';

describe('Most commented films getter', () => {
  it('should return an empty array if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });
    expect(model.mostCommentedFilms).toStrictEqual([]);
  });

  it('should return an empty array if all the films have 0 comments', () => {
    const model = new Model({
      ...getInitialState(),
      films: [getEmptyFilm(), getEmptyFilm()],
    });
    expect(model.mostCommentedFilms).toStrictEqual([]);
  });

  it('should return 1 film if 2 films were passed (one of them has 0 comments)', () => {
    const filmWithComments = getFilms()[0];
    const model = new Model({
      ...getInitialState(),
      films: [filmWithComments, getEmptyFilm()],
    });
    expect(model.mostCommentedFilms).toStrictEqual([filmWithComments]);
  });

  it('should return two films have been passed', () => {
    const filmsWithComments = getFilms();
    const model = new Model({
      ...getInitialState(),
      films: [filmsWithComments[0], filmsWithComments[1]],
    });
    expect(model.mostCommentedFilms).toHaveLength(model.state.films.length);
  });

  it('should return MOST_COMMENTED_FILMS_COUNT', () => {
    const model = new Model({
      ...getInitialState(),
      films: [...getFilms(), ...getFilms(), ...getFilms()],
    });
    expect(model.state.films.length).toBeGreaterThan(Constants.MOST_COMMENTED_FILMS_COUNT);
    expect(model.mostCommentedFilms).toHaveLength(Constants.MOST_COMMENTED_FILMS_COUNT);
  });
});
