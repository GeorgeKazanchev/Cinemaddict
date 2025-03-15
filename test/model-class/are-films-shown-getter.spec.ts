import { it, describe, expect } from '@jest/globals';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Are films shown getter', () => {
  it('should return true if there are shown films', () => {
    const model = new Model(getInitialState());
    expect(model.areFilmsShown).toBe(true);
  });

  it('should return false if there are no shown films', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
      shownFilmsCount: 0,
    });
    expect(model.areFilmsShown).toBe(false);
  });
});
