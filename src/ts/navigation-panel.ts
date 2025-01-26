import Filter from './model/enums/filter';
import { getElementFromTemplate } from './util';
import type FilmsSummary from './model/types/films-summary';

const FILTER_ACTIVE_CLASSNAME = 'main-navigation__item--active';
const STATS_ACTIVE_CLASSNAME = 'main-navigation__additional--active';

type Props = {
  filmsSummary: FilmsSummary;
  filter?: Filter;
  isFilmsScreen: boolean;
};

const getNavigationPanel = ({
  filmsSummary,
  filter = Filter.All,
  isFilmsScreen,
}: Props): Element => {
  const {
    watchlistFilmsCount,
    watchedFilmsCount,
    favoriteFilmsCount,
  } = filmsSummary;

  const isStatsSelected = !isFilmsScreen;
  const isAllSelected = isFilmsScreen && filter === Filter.All;
  const isWatchlistSelected = isFilmsScreen && filter === Filter.Watchlist;
  const isWatchedSelected = isFilmsScreen && filter === Filter.Watched;
  const isFavoriteSelected = isFilmsScreen && filter === Filter.Favorite;

  const content = `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--all ${isAllSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
          All movies
        </a>
        <a href="#watchlist" class="main-navigation__item ${isWatchlistSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
          Watchlist <span class="main-navigation__item-count">${watchlistFilmsCount}</span>
        </a>
        <a href="#history" class="main-navigation__item ${isWatchedSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
          History <span class="main-navigation__item-count">${watchedFilmsCount}</span>
        </a>
        <a href="#favorites" class="main-navigation__item ${isFavoriteSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
          Favorites <span class="main-navigation__item-count">${favoriteFilmsCount}</span>
        </a>
      </div>

      <a href="#stats" class="main-navigation__additional ${isStatsSelected ? STATS_ACTIVE_CLASSNAME : ''}">
        Stats
      </a>
    </nav>`;

  return getElementFromTemplate(content);
};

export default getNavigationPanel;
