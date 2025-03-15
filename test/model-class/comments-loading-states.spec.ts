import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Comments loading states getter', () => {
  it('should correctly initialize the states', () => {
    const model = new Model(getInitialState());
    const { commentsLoadingStates } = model;
    const loadingStateValues = [...commentsLoadingStates.values()];

    expect(commentsLoadingStates).toBeDefined();
    expect(loadingStateValues).toHaveLength(model.state.films.length);
    expect(loadingStateValues.every((state) => state === 'pending')).toBe(true);
  });
});
