import AbstractView from './abstract-view';
import Model from './model/model';

export default class FooterView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    const { state } = this._model;
    const totalFilmsCount = state.films.length;

    return `
      <footer class="footer">
        <section class="footer__logo logo logo--smaller">Cinemaddict</section>
        <section class="footer__statistics">
          <p>${totalFilmsCount} ${totalFilmsCount === 1 ? 'movie' : 'movies'} inside</p>
        </section>
      </footer>`;
  }
}
