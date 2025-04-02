import AbstractView from './abstract-view';
import { getTargetAsElement, loadElementLazy } from './dom-util';
import { Filter } from './model';
import Model from './model/model';

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
  private _watchlistCountElement: Element | null = null;
  private _watchedCountElement: Element | null = null;
  private _favoriteCountElement: Element | null = null;

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
      <nav class="main-navigation" id="main-navigation" aria-label="Website">
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

  public get watchlistCountElement(): Element {
    this._watchlistCountElement = loadElementLazy(
      this._watchlistCountElement,
      this.element,
      '[href="#watchlist"] .main-navigation__item-count',
      'No watchlist films count element found in the navigation panel',
    );
    return this._watchlistCountElement;
  }

  public get watchedCountElement(): Element {
    this._watchedCountElement = loadElementLazy(
      this._watchedCountElement,
      this.element,
      '[href="#history"] .main-navigation__item-count',
      'No watched films count element found in the navigation panel',
    );
    return this._watchedCountElement;
  }

  public get favoriteCountElement(): Element {
    this._favoriteCountElement = loadElementLazy(
      this._favoriteCountElement,
      this.element,
      '[href="#favorites"] .main-navigation__item-count',
      'No favorite films count element found in the navigation panel',
    );
    return this._favoriteCountElement;
  }

  public bind(): void {
    const filterButtonElements = this.element.querySelectorAll('.main-navigation__item');
    const statisticsElement = this.element.querySelector('.main-navigation__additional');

    filterButtonElements.forEach((element) => {
      element.addEventListener('click', (evt: Event): void => {
        evt.preventDefault();
        const linkElement = getTargetAsElement(evt).closest('.main-navigation__item');
        if (!linkElement) {
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

    statisticsElement?.addEventListener('click', (evt: Event): void => {
      evt.preventDefault();
      this.onStatisticsOpen();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onFiltration(filter: Filter): void { }
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

    this.watchlistCountElement.textContent = watchlistFilmsCount.toFixed(0);
    this.watchedCountElement.textContent = watchedFilmsCount.toFixed(0);
    this.favoriteCountElement.textContent = favoriteFilmsCount.toFixed(0);
  }

  //  Метод предназначен для открытия/закрытия меню в мобильной версии вёрстки
  public toggleMenuVisibility(): void {
    this.element.classList.toggle('main-navigation--shown');
  }
}
