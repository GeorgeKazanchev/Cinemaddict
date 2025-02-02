import AbstractView from './abstract-view';

type Props = {
  totalFilmsCount: number;
};

export default class FooterView extends AbstractView {
  constructor({ totalFilmsCount }: Props) {
    super();
    this._totalFilmsCount = totalFilmsCount;
  }

  private _totalFilmsCount: number;

  public get template(): string {
    const totalFilmsCount = this._totalFilmsCount;

    return `
      <footer class="footer">
        <section class="footer__logo logo logo--smaller">Cinemaddict</section>
        <section class="footer__statistics">
          <p>${totalFilmsCount} ${totalFilmsCount === 1 ? 'movie' : 'movies'} inside</p>
        </section>
      </footer>`;
  }
}
