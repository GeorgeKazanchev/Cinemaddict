import getFilmCard from './film-card';
import Filter from './model/enums/filter';
import SortType from './model/enums/sort-type';
import filterFilms from './model/filter-films';
import { getFilmsSummary } from './model/get-statistics';
import sortFilms from './model/sort-films';
import getNavigationPanel from './navigation-panel';
import getSortPanel from './sort-panel';
import { getElementFromTemplate } from './util';
import type Film from './model/types/film';

type Props = {
  films: Film[];
  filter?: Filter;
  sortType?: SortType;
};

const getFilmsScreen = ({
  films,
  filter = Filter.All,
  sortType = SortType.Default,
}: Props): Element => {
  const filmsSummary = getFilmsSummary(films);

  const sortPanel = getSortPanel({ sortType }).outerHTML;
  const navigationPanel = getNavigationPanel({
    filmsSummary,
    filter,
    isFilmsScreen: true,
  }).outerHTML;

  const filteredFilms = filterFilms(films, filter);
  const shownFilms = sortFilms(filteredFilms, sortType);
  const filmCards = shownFilms.map((film) => getFilmCard({ film }).outerHTML).join('');

  const content = `
    <div>
      ${navigationPanel}
      ${sortPanel}
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <div class="films-list__container">
            ${filmCards}
          </div>
          <button class="films-list__show-more">Show more</button>
        </section>
      </section>
    </div>`;

  return getElementFromTemplate(content);
};

export default getFilmsScreen;
