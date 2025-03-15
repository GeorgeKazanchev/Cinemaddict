import { it, describe, expect } from '@jest/globals';
import { Statistics } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Films summary getter', () => {
  it('should correctly return the films summary', () => {
    const model = new Model(getInitialState());
    const { filmsSummary } = model;
    expect(filmsSummary).toStrictEqual(Statistics.getFilmsSummary(model.state.films));
  });
});
