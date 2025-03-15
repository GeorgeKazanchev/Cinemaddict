import { it, describe, expect } from '@jest/globals';
import { cloneDeep, Film } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import { getEmptyFilm, getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();

describe('Update film', () => {
  it('should update the user details of an existing film', () => {
    const model = new Model(getInitialState());
    const initFilm = model.state.films[0];
    const { userDetails } = initFilm;

    const updatedFilm = cloneDeep(initFilm) as Film;
    updatedFilm.userDetails = {
      inWatchlist: !userDetails.inWatchlist,
      isWatched: !userDetails.isWatched,
      watchingDate: userDetails.watchingDate ? null : new Date(),
      isFavorite: !userDetails.isFavorite,
    };

    model.updateFilm(updatedFilm);

    expect(model.state.films).not.toContain(initFilm);
    expect(model.state.films).toContain(updatedFilm);
    expect(model.state.films[0].userDetails).toStrictEqual(updatedFilm.userDetails);
  });

  it('should update the whole existing film', () => {
    const model = new Model(getInitialState());
    const initFilm = model.state.films[1];
    const updatedFilm = films[0];
    updatedFilm.id = initFilm.id;

    model.updateFilm(updatedFilm);

    expect(model.state.films).not.toContain(initFilm);
    expect(model.state.films).toContain(updatedFilm);
    expect(model.state.films[1]).toStrictEqual(updatedFilm);
  });

  it('should throw an error if the film does not exist', () => {
    const model = new Model(getInitialState());
    expect(() => { model.updateFilm(getEmptyFilm()); }).toThrowError();
  });

  it('should throw an error if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });
    expect(() => { model.updateFilm(films[0]); }).toThrowError();
  });
});
