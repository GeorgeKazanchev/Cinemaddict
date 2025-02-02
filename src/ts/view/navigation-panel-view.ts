import Filter from '../model/enums/filter';
import { getTargetAsElement } from '../util';
import AbstractView from './abstract-view';
import type FilmsSummary from '../model/types/films-summary';

const FILTER_ACTIVE_CLASSNAME = 'main-navigation__item--active';
const STATS_ACTIVE_CLASSNAME = 'main-navigation__additional--active';

const hrefsToFilters = new Map<string, Filter>();
hrefsToFilters.set('#all', Filter.All);
hrefsToFilters.set('#watchlist', Filter.Watchlist);
hrefsToFilters.set('#history', Filter.Watched);
hrefsToFilters.set('#favorites', Filter.Favorite);

type Props = {
  filmsSummary: FilmsSummary;
  filter?: Filter;
  isFilmsScreen: boolean;
};

export default class NavigationPanelView extends AbstractView {
  constructor({ filmsSummary, filter = Filter.All, isFilmsScreen }: Props) {
    super();
    this._filmsSummary = filmsSummary;
    this._filter = filter;
    this._isFilmsScreen = isFilmsScreen;
  }

  private _filmsSummary: FilmsSummary;
  private _filter: Filter;
  private _isFilmsScreen: boolean;

  public get template(): string {
    const {
      watchlistFilmsCount,
      watchedFilmsCount,
      favoriteFilmsCount,
    } = this._filmsSummary;

    const filter = this._filter;
    const isFilmsScreen = this._isFilmsScreen;

    const isStatsSelected = !isFilmsScreen;
    const isAllSelected = isFilmsScreen && filter === Filter.All;
    const isWatchlistSelected = isFilmsScreen && filter === Filter.Watchlist;
    const isWatchedSelected = isFilmsScreen && filter === Filter.Watched;
    const isFavoriteSelected = isFilmsScreen && filter === Filter.Favorite;

    return `
      <nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="link main-navigation__item ${isAllSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
            All movies
          </a>
          <a href="#watchlist" class="link main-navigation__item ${isWatchlistSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
            Watchlist <span class="main-navigation__item-count">${watchlistFilmsCount}</span>
          </a>
          <a href="#history" class="link main-navigation__item ${isWatchedSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
            History <span class="main-navigation__item-count">${watchedFilmsCount}</span>
          </a>
          <a href="#favorites" class="link main-navigation__item ${isFavoriteSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
            Favorites <span class="main-navigation__item-count">${favoriteFilmsCount}</span>
          </a>
        </div>

        <a href="#stats" class="link main-navigation__additional ${isStatsSelected ? STATS_ACTIVE_CLASSNAME : ''}">
          Stats
        </a>
      </nav>`;
  }

  public bind(): void {
    const filterButtonElements = this.element.querySelectorAll('.main-navigation__item');
    const statisticsElement = this.element.querySelector('.main-navigation__additional');

    filterButtonElements.forEach((element) => {
      element.addEventListener('click', (evt: Event) => {
        evt.preventDefault();
        const linkElement = getTargetAsElement(evt).closest('.main-navigation__item');
        if (!(linkElement instanceof HTMLAnchorElement)) {
          return;
        }

        const href = linkElement.getAttribute('href');
        if (!href) {
          return;
        }

        const filter = hrefsToFilters.get(href);
        if (filter) {
          this.onFiltration(filter);
        }
      });
    });

    statisticsElement?.addEventListener('click', (evt: Event) => {
      evt.preventDefault();
      this.onStatisticsOpen();
    });
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onFiltration(filter: Filter): void { }

  public onStatisticsOpen(): void { }
}
