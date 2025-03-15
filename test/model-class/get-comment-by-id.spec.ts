import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Get comment by id', () => {
  it('should return the comment presented in the model', () => {
    const model = new Model(getInitialState());
    const comment = model.state.comments[0];
    expect(model.getCommentById(comment.id)).toStrictEqual(comment);
  });

  it('should throw an error if the comment is not presented in the model', () => {
    const model = new Model(getInitialState());
    expect(() => { model.getCommentById('-1'); }).toThrowError();
  });
});
