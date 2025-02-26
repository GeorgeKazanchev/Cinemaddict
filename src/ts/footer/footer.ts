import FooterView from './footer-view';

type Props = {
  totalFilmsCount: number;
};

export default class Footer {
  constructor({ totalFilmsCount }: Props) {
    this._totalFilmsCount = totalFilmsCount;
    this._footerView = new FooterView({ totalFilmsCount: this._totalFilmsCount });
  }

  private _totalFilmsCount: number;
  private _footerView: FooterView;

  public get element(): Element {
    return this._footerView.element;
  }
}
