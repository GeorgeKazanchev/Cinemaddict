import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import { getEmptyFilm } from '../get-films';
import getInitialState from './get-initial-state';

describe('Get comments count', () => {
  it('should return the number > 0 if the film has comments', () => {
    const model = new Model(getInitialState());
    expect(model.getCommentsCount(model.state.films[0].id)).toBe(1);
  });

  it('should return 0 if the film has no comments', () => {
    const emptyFilm = getEmptyFilm();
    const model = new Model({
      ...getInitialState(),
      films: [emptyFilm],
    });
    expect(model.getCommentsCount(emptyFilm.id)).toBe(0);
  });

  it('should throw an error if the film is not presented in the model', () => {
    const model = new Model(getInitialState());
    expect(() => { model.getCommentsCount('-1'); }).toThrowError();
  });

  it('should throw an error if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });
    expect(() => { model.getCommentsCount('1'); }).toThrowError();
  });
});
