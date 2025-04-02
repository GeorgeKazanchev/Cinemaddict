import AbstractView from '../abstract-view';
import { renderStatisticsChart } from '../model';
import Model from '../model/model';

export default class ChartView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    return `
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>`;
  }

  public get element(): Element {
    const element = this.createElementLazy();
    this._renderChart(ChartView._getCanvasElement(element));
    return element;
  }

  public updateChart(): void {
    this._renderChart(ChartView._getCanvasElement(this.element));
  }

  private _renderChart(canvasElement: HTMLCanvasElement): void {
    renderStatisticsChart(this._model.watchedFilmsInPeriod, canvasElement);
  }

  private static _getCanvasElement(containerElement: Element): HTMLCanvasElement {
    const element = containerElement.querySelector('.statistic__chart');
    if (!(element instanceof HTMLCanvasElement)) {
      throw new Error('No canvas element found');
    }
    return element;
  }
}
