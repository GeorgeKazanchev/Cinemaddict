import AbstractView from './abstract-view';
import Model from './model/model';

export default class FooterView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    const statistics = this._getStatisticsTemplate();

    return `
      <footer class="footer">
        <section class="footer__logo logo logo--smaller">
          <h2 class="logo__title">Cinemaddict</h2>
        </section>
        <section class="footer__statistics">
          ${statistics}
        </section>
      </footer>`;
  }

  public updateFilmsCount(): void {
    const statisticsElement = this.element.querySelector('.footer__statistics');
    if (!statisticsElement) {
      throw new Error('No statistics element found in the footer');
    }

    statisticsElement.innerHTML = this._getStatisticsTemplate();
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
