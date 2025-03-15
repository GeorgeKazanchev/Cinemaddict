import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import { getComments } from '../get-comments';
import getInitialState from './get-initial-state';

const comments = getComments();

describe('Add comments', () => {
  it('should add several comments to the model', () => {
    const model = new Model(getInitialState());
    const initComments = [...model.state.comments];
    model.addComments(comments);
    expect(model.state.comments).toStrictEqual(initComments.concat(comments));
  });

  it('should add one comment', () => {
    const model = new Model(getInitialState());
    const initComments = [...model.state.comments];
    const addedComments = [comments[0]];
    model.addComments(addedComments);
    expect(model.state.comments).toStrictEqual(initComments.concat(addedComments));
  });

  it('should not add comments if an empty array was passed', () => {
    const model = new Model(getInitialState());
    const initComments = [...model.state.comments];
    model.addComments([]);
    expect(model.state.comments).toStrictEqual(initComments);
  });
});
