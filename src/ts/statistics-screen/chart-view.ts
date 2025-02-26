import AbstractView from '../abstract-view';
import { Film, renderStatisticsChart } from '../model';

type Props = {
  films: Film[];
};

export default class ChartView extends AbstractView {
  constructor({ films }: Props) {
    super();
    this._films = films;
  }

  private _films: Film[];

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
      renderStatisticsChart(this._films, canvasElement);
    }
    return element;
  }

  public updateChart(films: Film[]): void {
    this._films = films;
    const canvasElement = this.element.querySelector('.statistic__chart');
    if (canvasElement instanceof HTMLCanvasElement) {
      renderStatisticsChart(this._films, canvasElement);
    }
  }
}
