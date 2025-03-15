import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import { getEmptyComment } from '../get-comments';
import getInitialState from './get-initial-state';

describe('Delete comment', () => {
  it('should delete the specific comment if it exists', () => {
    const model = new Model(getInitialState());
    const comment = model.state.comments[0];
    const film = model.state.films[0];

    const initCommentsCount = model.state.comments.length;
    const initFilmCommentsCount = film.commentsIds.length;

    model.deleteComment(comment, film.id);

    expect(model.state.comments).not.toContain(comment);
    expect(model.state.comments).toHaveLength(initCommentsCount - 1);
    expect(film.commentsIds).not.toContain(comment.id);
    expect(film.commentsIds).toHaveLength(initFilmCommentsCount - 1);
  });

  it('should throw an error if there is no comment in the model', () => {
    const model = new Model(getInitialState());
    const comment = getEmptyComment();
    const film = model.state.films[0];
    expect(() => { model.deleteComment(comment, film.id); }).toThrowError();
  });

  it('should throw an error if there is no film in the model', () => {
    const model = new Model(getInitialState());
    const comment = model.state.comments[0];
    expect(() => { model.deleteComment(comment, '-1'); }).toThrowError();
  });

  it('should throw an error if there are no comments in the model', () => {
    const model = new Model({
      ...getInitialState(),
      comments: [],
    });

    const comment = getEmptyComment();
    const film = model.state.films[0];
    expect(() => { model.deleteComment(comment, film.id); }).toThrowError();
  });

  it('should throw an error if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });

    const comment = getEmptyComment();
    expect(() => { model.deleteComment(comment, '-1'); }).toThrowError();
  });
});
