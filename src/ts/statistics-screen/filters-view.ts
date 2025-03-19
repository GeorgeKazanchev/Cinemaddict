import AbstractView from '../abstract-view';
import { StatisticsPeriod } from '../model';
import Model from '../model/model';
import { getTargetAsElement } from '../util';

const inputValuesToStatsPeriods = new Map<string, StatisticsPeriod>();
inputValuesToStatsPeriods.set('all-time', StatisticsPeriod.AllTime);
inputValuesToStatsPeriods.set('today', StatisticsPeriod.Today);
inputValuesToStatsPeriods.set('week', StatisticsPeriod.Week);
inputValuesToStatsPeriods.set('month', StatisticsPeriod.Month);
inputValuesToStatsPeriods.set('year', StatisticsPeriod.Year);

export default class FiltersView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    const { period } = this._model.state;

    return `
      <form action="#" method="get" class="statistic__filters">
        <p class="statistic__filters-description" id="statistic-filters-description">Show stats:</p>

        <select class="statistic__select" aria-labelledby="statistic-filters-description">
          <option value="all-time" ${period === StatisticsPeriod.AllTime ? 'selected' : ''}>All time</option>
          <option value="today" ${period === StatisticsPeriod.Today ? 'selected' : ''}>Today</option>
          <option value="week" ${period === StatisticsPeriod.Week ? 'selected' : ''}>Week</option>
          <option value="month" ${period === StatisticsPeriod.Month ? 'selected' : ''}>Month</option>
          <option value="year" ${period === StatisticsPeriod.Year ? 'selected' : ''}>Year</option>
        </select>

        <div class="statistic__radio-buttons">
          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-all-time"
            value="all-time"
            ${period === StatisticsPeriod.AllTime ? 'checked' : ''}
          >
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-today"
            value="today"
            ${period === StatisticsPeriod.Today ? 'checked' : ''}
          >
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-week"
            value="week"
            ${period === StatisticsPeriod.Week ? 'checked' : ''}
          >
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-month"
            value="month"
            ${period === StatisticsPeriod.Month ? 'checked' : ''}
          >
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-year"
            value="year"
            ${period === StatisticsPeriod.Year ? 'checked' : ''}
          >
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </div>
      </form>`;
  }

  public bind(): void {
    this.element.addEventListener('change', (evt: Event) => {
      const targetElement = getTargetAsElement(evt);
      const inputElement = targetElement.closest('.statistic__filters-input');
      const selectElement = targetElement.closest('.statistic__select');

      if (inputElement instanceof HTMLInputElement) {
        this._changePeriodByValue(inputElement.value);
      }

      if (selectElement instanceof HTMLSelectElement) {
        this._changePeriodByValue(selectElement.value);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onPeriodChanged(period: StatisticsPeriod): void { }

  private _changePeriodByValue(value: string): void {
    const period = inputValuesToStatsPeriods.get(value);
    if (period) {
      this.onPeriodChanged(period);
    }
  }
}
