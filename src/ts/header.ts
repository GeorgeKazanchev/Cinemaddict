import getRank from './model/get-rank';
import { getFilmsSummary } from './model/get-statistics';
import HeaderView from './view/header-view';
import type Film from './model/types/film';

type Props = {
  films: Film[];
};

export default class Header {
  constructor({ films }: Props) {
    this._films = films;

    const filmsSummary = getFilmsSummary(this._films);
    const rank = getRank(filmsSummary.watchedFilmsCount);

    this._headerView = new HeaderView({ rank });
  }

  private _films: Film[];
  private _headerView: HeaderView;

  public get element(): Element {
    return this._headerView.element;
  }
}
