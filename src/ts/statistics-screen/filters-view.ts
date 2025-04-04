import AbstractView from '../abstract-view';
import { getTargetAsElement } from '../dom-util';
import { StatisticsPeriod } from '../model';
import Model from '../model/model';

const FILTERS_CLASSNAME = 'statistic__filters-input';

const valuesToStatsPeriods = new Map<string, StatisticsPeriod>();
valuesToStatsPeriods.set('all-time', StatisticsPeriod.AllTime);
valuesToStatsPeriods.set('today', StatisticsPeriod.Today);
valuesToStatsPeriods.set('week', StatisticsPeriod.Week);
valuesToStatsPeriods.set('month', StatisticsPeriod.Month);
valuesToStatsPeriods.set('year', StatisticsPeriod.Year);

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
            aria-labelledby="statistic-all-time-label"
            value="all-time"
            ${period === StatisticsPeriod.AllTime ? 'checked' : ''}
            tabindex="-1"
          >
          <label for="statistic-all-time" class="statistic__filters-label" id="statistic-all-time-label" tabindex="0">All time</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-today"
            aria-labelledby="statistic-today-label"
            value="today"
            ${period === StatisticsPeriod.Today ? 'checked' : ''}
            tabindex="-1"
          >
          <label for="statistic-today" class="statistic__filters-label" id="statistic-today-label" tabindex="0">Today</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-week"
            aria-labelledby="statistic-week-label"
            value="week"
            ${period === StatisticsPeriod.Week ? 'checked' : ''}
            tabindex="-1"
          >
          <label for="statistic-week" class="statistic__filters-label" id="statistic-week-label" tabindex="0">Week</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-month"
            aria-labelledby="statistic-month-label"
            value="month"
            ${period === StatisticsPeriod.Month ? 'checked' : ''}
            tabindex="-1"
          >
          <label for="statistic-month" class="statistic__filters-label" id="statistic-month-label" tabindex="0">Month</label>

          <input
            type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter"
            id="statistic-year"
            aria-labelledby="statistic-year-label"
            value="year"
            ${period === StatisticsPeriod.Year ? 'checked' : ''}
            tabindex="-1"
          >
          <label for="statistic-year" class="statistic__filters-label" id="statistic-year-label" tabindex="0">Year</label>
        </div>
      </form>`;
  }

  public bind(): void {
    this.element.addEventListener('change', (evt: Event): void => {
      const targetElement = getTargetAsElement(evt);
      const inputElement = targetElement.closest(`.${FILTERS_CLASSNAME}`);
      const selectElement = targetElement.closest('.statistic__select');

      if (inputElement instanceof HTMLInputElement) {
        this._changePeriodByValue(inputElement.value);
      }

      if (selectElement instanceof HTMLSelectElement) {
        this._changePeriodByValue(selectElement.value);
      }
    });

    const inputsContainerElement = this.element.querySelector('.statistic__radio-buttons');

    const inputsContainerKeydownHandler = (evt: KeyboardEvent): void => {
      const targetElement = getTargetAsElement(evt);
      if (!(targetElement instanceof HTMLLabelElement)) {
        return;
      }

      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        const inputElement = this.element.querySelector(`#${targetElement.htmlFor}`);
        if (!(inputElement instanceof HTMLInputElement)) {
          throw new Error('No statistics filter input found');
        }
        this._changePeriodByValue(inputElement.value);
      }
    };

    inputsContainerElement?.addEventListener('keydown', inputsContainerKeydownHandler as EventListener);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onPeriodChange(period: StatisticsPeriod): void { }

  public updateActiveFilter(): void {
    const activeElement = this.element.querySelector(`.${FILTERS_CLASSNAME}:checked`);
    if (activeElement instanceof HTMLInputElement) {
      activeElement.checked = false;
    }

    const { period } = this._model.state;
    const statsPeriodValuePair = [...valuesToStatsPeriods].find(([, value]) => value === period);
    if (!statsPeriodValuePair) {
      throw new Error(`No input value found matching statistics period ${period}`);
    }

    const periodName = statsPeriodValuePair[0];
    const newActiveElement = this.element.querySelector(`.${FILTERS_CLASSNAME}[value="${periodName}"]`);
    if (!(newActiveElement instanceof HTMLInputElement)) {
      throw new Error('No new active input for statistics found');
    }
    newActiveElement.checked = true;
  }

  private _changePeriodByValue(value: string): void {
    const period = valuesToStatsPeriods.get(value);
    if (period) {
      this.onPeriodChange(period);
    }
  }
}
