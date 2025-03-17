import AbstractView from './abstract-view';
import { Filter } from './model';
import Model from './model/model';
import { getTargetAsElement } from './util';

const FILTER_ACTIVE_CLASSNAME = 'main-navigation__item--active';
const STATS_ACTIVE_CLASSNAME = 'main-navigation__additional--active';

const hrefsToFilters = new Map<string, Filter>();
hrefsToFilters.set('#all', Filter.All);
hrefsToFilters.set('#watchlist', Filter.Watchlist);
hrefsToFilters.set('#history', Filter.Watched);
hrefsToFilters.set('#favorites', Filter.Favorite);

type Props = {
  isFilmsScreen: boolean;
  model: Model;
};

export default class NavigationPanelView extends AbstractView {
  constructor({ model, isFilmsScreen }: Props) {
    super();
    this._model = model;
    this._isFilmsScreen = isFilmsScreen;
  }

  private _model: Model;
  private _isFilmsScreen: boolean;

  public get template(): string {
    const {
      watchlistFilmsCount,
      watchedFilmsCount,
      favoriteFilmsCount,
    } = this._model.filmsSummary;

    const { filter } = this._model.state;
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
            Watchlist <span class="main-navigation__item-count">${watchlistFilmsCount.toFixed(0)}</span>
          </a>
          <a href="#history" class="link main-navigation__item ${isWatchedSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
            History <span class="main-navigation__item-count">${watchedFilmsCount.toFixed(0)}</span>
          </a>
          <a href="#favorites" class="link main-navigation__item ${isFavoriteSelected ? FILTER_ACTIVE_CLASSNAME : ''}">
            Favorites <span class="main-navigation__item-count">${favoriteFilmsCount.toFixed(0)}</span>
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
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public onStatisticsOpen(): void { }

  public updateActiveFilter(): void {
    const activeFilterElement = this.element.querySelector(`.${FILTER_ACTIVE_CLASSNAME}`);
    if (activeFilterElement) {
      activeFilterElement.classList.remove(FILTER_ACTIVE_CLASSNAME);
    }

    const { filter } = this._model.state;
    const filterHrefPair = [...hrefsToFilters].find(([, value]) => value === filter);
    if (!filterHrefPair) {
      throw new Error(`No href found matching filter ${filter}`);
    }

    const newActiveFilterElement = this.element.querySelector(`[href="${filterHrefPair[0]}"]`);
    newActiveFilterElement?.classList.add(FILTER_ACTIVE_CLASSNAME);
  }

  public updateFilmsSummary(): void {
    const {
      watchlistFilmsCount,
      watchedFilmsCount,
      favoriteFilmsCount,
    } = this._model.filmsSummary;

    const watchlistCountElement = this.element.querySelector('[href="#watchlist"] .main-navigation__item-count');
    const watchedCountElement = this.element.querySelector('[href="#history"] .main-navigation__item-count');
    const favoriteCountElement = this.element.querySelector('[href="#favorites"] .main-navigation__item-count');

    if (!watchlistCountElement || !watchedCountElement || !favoriteCountElement) {
      throw new Error('No films count label in the navigation panel found');
    }

    watchlistCountElement.textContent = watchlistFilmsCount.toFixed(0);
    watchedCountElement.textContent = watchedFilmsCount.toFixed(0);
    favoriteCountElement.textContent = favoriteFilmsCount.toFixed(0);
  }

  //  Метод предназначен для открытия/закрытия меню в мобильной версии вёрстки
  public toggleMenuVisibility(): void {
    this.element.classList.toggle('main-navigation--shown');
  }
}
