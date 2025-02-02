import getRank from './model/get-rank';
import { getFilmsSummary } from './model/get-statistics';
import HeaderView from './view/header-view';
import type Film from './model/types/film';

type Props = {
  films: Film[];
};

const getHeader = ({ films }: Props): Element => {
  const filmsSummary = getFilmsSummary(films);
  const rank = getRank(filmsSummary.watchedFilmsCount);

  const headerView = new HeaderView({ rank });
  return headerView.element;
};

export default getHeader;
