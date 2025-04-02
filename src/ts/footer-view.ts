import AbstractView from './abstract-view';
import { loadElementLazy } from './dom-util';
import Model from './model/model';

export default class FooterView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;
  private _statisticsElement: Element | null = null;

  public get template(): string {
    const statistics = this._getStatisticsTemplate();

    return `
      <footer class="footer">
        <section class="footer__logo logo logo--smaller">
          <svg class="logo__img" width="120" height="24" role="img">
            <use xlink:href="img/sprite.svg#logo"></use>
          </svg>
          <h2 class="visually-hidden">Cinemaddict</h2>
        </section>
        <section class="footer__statistics">
          ${statistics}
        </section>
      </footer>`;
  }

  public get statisticsElement(): Element {
    this._statisticsElement = loadElementLazy(
      this._statisticsElement,
      this.element,
      '.footer__statistics',
      'No statistics element found in the footer',
    );
    return this._statisticsElement;
  }

  public updateFilmsCount(): void {
    this.statisticsElement.innerHTML = this._getStatisticsTemplate();
  }

  private _getStatisticsTemplate(): string {
    const { state } = this._model;
    const totalFilmsCount = state.films.length;

    return (
      `<h2 class="visually-hidden">Total films number</h2>
      <p>${totalFilmsCount} ${totalFilmsCount === 1 ? 'movie' : 'movies'} inside</p>`
    );
  }
}
