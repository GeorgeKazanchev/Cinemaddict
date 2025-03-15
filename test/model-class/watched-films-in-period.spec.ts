import { it, describe, expect } from '@jest/globals';
import { StatisticsPeriod } from '../../src/ts/model';
import Model from '../../src/ts/model/model';
import getInitialState from './get-initial-state';

const checkNoWatchedFilmsInPeriod = (model: Model): void => {
  expect(model.watchedFilmsInPeriod).toStrictEqual([]);
};

describe('Watched films in period getter', () => {
  it('should return all the films if the period === StatisticsPeriod.AllTime', () => {
    const model = new Model(getInitialState());
    model.setStatisticsPeriod(StatisticsPeriod.AllTime);
    expect(model.watchedFilmsInPeriod).toStrictEqual(model.state.films);
  });

  it('should return an empty array if the period === StatisticsPeriod.Today', () => {
    const model = new Model(getInitialState());
    model.setStatisticsPeriod(StatisticsPeriod.Today);
    checkNoWatchedFilmsInPeriod(model);
  });

  it('should return an empty array if there are no films in the model', () => {
    const model = new Model({
      ...getInitialState(),
      films: [],
    });

    model.setStatisticsPeriod(StatisticsPeriod.AllTime);
    checkNoWatchedFilmsInPeriod(model);

    model.setStatisticsPeriod(StatisticsPeriod.Year);
    checkNoWatchedFilmsInPeriod(model);

    model.setStatisticsPeriod(StatisticsPeriod.Month);
    checkNoWatchedFilmsInPeriod(model);

    model.setStatisticsPeriod(StatisticsPeriod.Week);
    checkNoWatchedFilmsInPeriod(model);

    model.setStatisticsPeriod(StatisticsPeriod.Today);
    checkNoWatchedFilmsInPeriod(model);
  });
});
