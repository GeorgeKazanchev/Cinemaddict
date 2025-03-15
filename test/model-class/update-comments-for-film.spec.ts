import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import { getComments } from '../get-comments';
import { getEmptyFilm, getFilms } from '../get-films';
import getInitialState from './get-initial-state';

const films = getFilms();
const comments = getComments();

describe('Update comments for film', () => {
  it('should update comments of the film', () => {
    const model = new Model({
      ...getInitialState(),
      films: [films[0]],
      comments: [comments[0]],
    });

    const film = model.state.films[0];
    const updatedComments = [comments[1], comments[0]];

    model.updateCommentsForFilm(film, updatedComments);

    expect(model.state.films[0].commentsIds).toStrictEqual([comments[1].id, comments[0].id]);
    expect(model.state.comments).toHaveLength(updatedComments.length);
  });

  it('should reset comments of the film', () => {
    const model = new Model({
      ...getInitialState(),
      films: [films[0]],
      comments: [comments[0]],
    });

    const film = model.state.films[0];

    model.updateCommentsForFilm(film, []);

    expect(model.state.films[0].commentsIds).toStrictEqual([]);
    expect(model.state.comments).toHaveLength(0);
  });

  it('should throw an error when trying to update the comments of a non-existing film', () => {
    const model = new Model(getInitialState());
    expect(() => { model.updateCommentsForFilm(getEmptyFilm(), []); }).toThrowError();
  });
});
