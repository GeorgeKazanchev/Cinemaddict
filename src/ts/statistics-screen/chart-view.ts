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
    const element = super.element;
    const canvasElement = element.querySelector('.statistic__chart');
    if (canvasElement instanceof HTMLCanvasElement) {
      this._renderChart(canvasElement);
    }
    return element;
  }

  public updateChart(): void {
    const canvasElement = this.element.querySelector('.statistic__chart');
    if (canvasElement instanceof HTMLCanvasElement) {
      this._renderChart(canvasElement);
    }
  }

  private _renderChart(canvasElement: HTMLCanvasElement): void {
    renderStatisticsChart(this._model.watchedFilmsInPeriod, canvasElement);
  }
}
