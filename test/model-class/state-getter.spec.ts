import { it, describe, expect } from '@jest/globals';
import { Filter, SortType, StatisticsPeriod } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Model state getter', () => {
  it('should return the state was passed to the model', () => {
    const model = new Model(getInitialState());
    const { state } = model;
    expect(state).toStrictEqual(getInitialState());
  });

  it('should return an actual state', () => {
    const model = new Model(getInitialState());
    model.setSortType(SortType.Date);
    model.setStatisticsPeriod(StatisticsPeriod.Year);

    const { state } = model;
    expect(state).toStrictEqual({
      ...getInitialState(),
      sortType: SortType.Date,
      period: StatisticsPeriod.Year,
    });
  });

  it('should not allow to change the obtained state', () => {
    const model = new Model(getInitialState());
    const { state } = model;

    expect(() => { state.films = []; }).toThrowError();
    expect(() => { state.comments = []; }).toThrowError();
    expect(() => { state.filter = Filter.Watched; }).toThrowError();
    expect(() => { state.sortType = SortType.Rating; }).toThrowError();
    expect(() => { state.period = StatisticsPeriod.Today; }).toThrowError();
    expect(() => { state.shownFilmsCount = 10000; }).toThrowError();
  });
});
