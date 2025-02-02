import StatisticsPeriod from '../../model/enums/statistics-period';
import { getTargetAsElement } from '../../util';
import AbstractView from '../abstract-view';

const inputValuesToStatsPeriods = new Map<string, StatisticsPeriod>();
inputValuesToStatsPeriods.set('all-time', StatisticsPeriod.AllTime);
inputValuesToStatsPeriods.set('today', StatisticsPeriod.Today);
inputValuesToStatsPeriods.set('week', StatisticsPeriod.Week);
inputValuesToStatsPeriods.set('month', StatisticsPeriod.Month);
inputValuesToStatsPeriods.set('year', StatisticsPeriod.Year);

type Props = {
  period: StatisticsPeriod;
};

export default class FiltersView extends AbstractView {
  constructor({ period }: Props) {
    super();
    this._period = period;
  }

  private _period: StatisticsPeriod;

  public get template(): string {
    return `
      <form action="#" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input
          type="radio"
          class="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-all-time"
          value="all-time"
          ${this._period === StatisticsPeriod.AllTime ? 'checked' : ''}
        >
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input
          type="radio"
          class="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-today"
          value="today"
          ${this._period === StatisticsPeriod.Today ? 'checked' : ''}
        >
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input
          type="radio"
          class="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-week"
          value="week"
          ${this._period === StatisticsPeriod.Week ? 'checked' : ''}
        >
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input
          type="radio"
          class="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-month"
          value="month"
          ${this._period === StatisticsPeriod.Month ? 'checked' : ''}
        >
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input
          type="radio"
          class="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-year"
          value="year"
          ${this._period === StatisticsPeriod.Year ? 'checked' : ''}
        >
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>`;
  }

  public bind(): void {
    this.element.addEventListener('change', (evt: Event) => {
      const inputElement = getTargetAsElement(evt).closest('.statistic__filters-input');
      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      const period = inputValuesToStatsPeriods.get(inputElement.value);
      if (period) {
        this.onPeriodChanged(period);
      }
    });
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onPeriodChanged(period: StatisticsPeriod): void { }
}
