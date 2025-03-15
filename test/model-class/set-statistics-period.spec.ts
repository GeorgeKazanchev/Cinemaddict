import { it, describe, expect } from '@jest/globals';
import { StatisticsPeriod } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

describe('Set statistics period', () => {
  it('should correctly set any statistics period', () => {
    const model = new Model(getInitialState());

    model.setStatisticsPeriod(StatisticsPeriod.AllTime);
    expect(model.state.period).toBe(StatisticsPeriod.AllTime);

    model.setStatisticsPeriod(StatisticsPeriod.Year);
    expect(model.state.period).toBe(StatisticsPeriod.Year);

    model.setStatisticsPeriod(StatisticsPeriod.Month);
    expect(model.state.period).toBe(StatisticsPeriod.Month);

    model.setStatisticsPeriod(StatisticsPeriod.Week);
    expect(model.state.period).toBe(StatisticsPeriod.Week);

    model.setStatisticsPeriod(StatisticsPeriod.Today);
    expect(model.state.period).toBe(StatisticsPeriod.Today);
  });
});
