import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import { getComments } from '../get-comments';
import { getEmptyFilm, getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();
const comments = getComments();

describe('Get comments', () => {
  it('should return an array of comments', () => {
    const model = new Model(getInitialState());
    expect(model.getComments(model.state.films[0].id)).toStrictEqual([comments[0]]);
  });

  it('should return an empty array if the film has no comments', () => {
    const emptyFilm = getEmptyFilm();
    const model = new Model({
      ...getInitialState(),
      films: [emptyFilm],
    });
    expect(model.getComments(emptyFilm.id)).toStrictEqual([]);
  });

  it('should throw an error if the film is not presented in the model', () => {
    const model = new Model(getInitialState());
    expect(() => { model.getComments('-1'); }).toThrowError();
  });

  it('should throw an error if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });
    expect(() => { model.getComments(films[0].id); }).toThrowError();
  });
});
