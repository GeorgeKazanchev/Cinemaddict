import getRank from './model/get-rank';
import { getFilmsSummary } from './model/get-statistics';
import { getElementFromTemplate } from './util';
import type Film from './model/types/film';

type Props = {
  films: Film[];
};

const getHeader = ({ films }: Props): Element => {
  const filmsSummary = getFilmsSummary(films);
  const userRank = getRank(filmsSummary.watchedFilmsCount);

  const profile = userRank
    ? `<section class="header__profile profile">
        <p class="profile__rating">${userRank}</p>
        <img class="profile__avatar" src="img/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    : '';

  const content = `
    <header class="header">
      <h1 class="header__logo logo">Cinemaddict</h1>
      ${profile}
    </header>`;

  return getElementFromTemplate(content);
};

export default getHeader;
