import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import { getEmptyFilm, getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();

describe('Set films', () => {
  it('should correctly updates films in the model', () => {
    const model = new Model(getInitialState());
    const initFilms = model.state.films;

    const newFilms = [films[2], films[0], films[1], getEmptyFilm()];
    model.setFilms(newFilms);

    const { state } = model;
    expect(state.films).toStrictEqual(newFilms);
    expect(state.films).not.toBe(initFilms);
  });

  it('should reset the films comments loading states to pending', () => {
    const model = new Model(getInitialState());
    const initFilms = model.state.films;
    model.commentsLoadingStates.set(initFilms[0].id, 'success');
    model.commentsLoadingStates.set(initFilms[2].id, 'error');

    const newFilms = [films[1], getEmptyFilm(), films[0]];
    model.setFilms(newFilms);

    const loadingStateValues = [...model.commentsLoadingStates.values()];
    expect(loadingStateValues.every((state) => state === 'pending')).toBe(true);
  });

  it('should correctly set 0 films', () => {
    const model = new Model(getInitialState());
    model.setFilms([]);

    expect(model.state.films).toStrictEqual([]);

    const loadingStateValues = [...model.commentsLoadingStates.values()];
    expect(loadingStateValues).toHaveLength(0);
  });
});
