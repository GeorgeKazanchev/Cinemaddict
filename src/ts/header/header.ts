import { getRank, Film, Statistics } from '../model';
import HeaderView from './header-view';

type Props = {
  films: Film[];
};

export default class Header {
  constructor({ films }: Props) {
    this._films = films;

    const filmsSummary = Statistics.getFilmsSummary(this._films);
    const rank = getRank(filmsSummary.watchedFilmsCount);

    this._headerView = new HeaderView({ rank });
  }

  private _films: Film[];
  private _headerView: HeaderView;

  public get element(): Element {
    return this._headerView.element;
  }

  public updateRank(rank: string): void {
    this._headerView.updateRank(rank);
  }
}
