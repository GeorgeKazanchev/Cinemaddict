import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Get film by id', () => {
  it('should return the film presented in the model', () => {
    const model = new Model(getInitialState());
    const film = model.state.films[0];
    expect(model.getFilmById(film.id)).toStrictEqual(film);
  });

  it('should throw an error if the film is not presented in the model', () => {
    const model = new Model(getInitialState());
    expect(() => { model.getFilmById('-1'); }).toThrowError();
  });
});
