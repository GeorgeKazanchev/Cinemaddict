import mocksComments from './data/mock-comments';
import Header from './header';
import Filter from './model/enums/filter';
import SortType from './model/enums/sort-type';
import filterFilms from './model/filter-films';
import getRank from './model/get-rank';
import { getFilmsSummary } from './model/get-statistics';
import sortFilms from './model/sort-films';
import Popup from './popup';
import StatisticsScreen from './statistics-screen';
import { render } from './util';
import { FilmsView, SortPanelView } from './view/films';
import NavigationPanelView from './view/navigation-panel-view';
import type Film from './model/types/film';

const FILMS_PORTION_SIZE = 5;

type Props = {
  films: Film[];
  filter?: Filter;
  header: Header;
  mainElement: Element;
  sortType?: SortType;
};

export default class FilmsScreen {
  constructor({
    films, filter, sortType, mainElement, header,
  }: Props) {
    this._films = films;
    this._filter = filter ?? Filter.All;
    this._sortType = sortType ?? SortType.Default;
    this._shownFilmsCount = this._getInitShownFilmsCount();
    this._mainElement = mainElement;
    this._header = header;

    const filmsSummary = getFilmsSummary(this._films);
    const shownFilms = this._getShownFilms();

    this._filmsView = new FilmsView({ films: shownFilms, areAllShown: this.areAllFilmsShown });
    this._sortPanelView = new SortPanelView({ sortType: this._sortType });
    this._navigationPanelView = new NavigationPanelView({
      filmsSummary,
      filter: this._filter,
      isFilmsScreen: true,
    });

    this._navigationPanelView.onFiltration = this._onFiltration.bind(this);
    this._navigationPanelView.onStatisticsOpen = this._onStatisticsOpen.bind(this);
    this._sortPanelView.onSort = this._onSort.bind(this);
    this._filmsView.onShowMore = this._onShowMore.bind(this);
    this._filmsView.onPopupOpen = this._onPopupOpen.bind(this);
    this._filmsView.onWatchlistChange = this._onWatchlistChange.bind(this);
    this._filmsView.onWatchedChange = this._onWatchedChange.bind(this);
    this._filmsView.onFavoriteChange = this._onFavoriteChange.bind(this);
  }

  private _films: Film[];
  private _filter: Filter;
  private _sortType: SortType;
  private _shownFilmsCount: number;
  private _navigationPanelView: NavigationPanelView;
  private _sortPanelView: SortPanelView;
  private _filmsView: FilmsView;
  private _element: Element | null = null;
  private _mainElement: Element;
  private _header: Header;

  public get element(): Element {
    if (this._element) {
      return this._element;
    }

    this._element = document.createElement('div');
    this._element.append(this._navigationPanelView.element);
    this._element.append(this._sortPanelView.element);
    this._element.append(this._filmsView.element);

    return this._element;
  }

  public get areAllFilmsShown(): boolean {
    const filteredFilms = filterFilms(this._films, this._filter);
    return this._shownFilmsCount >= filteredFilms.length;
  }

  private _onFiltration(selectedFilter: Filter): void {
    if (this._filter !== selectedFilter) {
      this._filter = selectedFilter;
      this._sortType = SortType.Default;
      this._shownFilmsCount = this._getInitShownFilmsCount();
      this._filmsView.updateFilms(this._getShownFilms());
      this._filmsView.updateShowMoreButton(this.areAllFilmsShown);
      this._navigationPanelView.updateActiveFilter(this._filter);
      this._sortPanelView.updateActiveSortType(this._sortType);
    }
  }

  private _onStatisticsOpen(): void {
    const statisticsScreen = new StatisticsScreen({
      films: this._films,
      mainElement: this._mainElement,
      header: this._header,
    });
    render(statisticsScreen.element, this._mainElement);
  }

  private _onSort(selectedSortType: SortType): void {
    if (this._sortType !== selectedSortType) {
      this._sortType = selectedSortType;
      this._shownFilmsCount = this._getInitShownFilmsCount();
      this._filmsView.updateFilms(this._getShownFilms());
      this._filmsView.updateShowMoreButton(this.areAllFilmsShown);
      this._sortPanelView.updateActiveSortType(this._sortType);
    }
  }

  private _onShowMore(): void {
    const filmsLeftCount = this._films.length - this._getShownFilms().length;
    this._shownFilmsCount += Math.min(FILMS_PORTION_SIZE, filmsLeftCount);
    this._filmsView.updateFilms(this._getShownFilms());
    this._filmsView.updateShowMoreButton(this.areAllFilmsShown);
  }

  private _onPopupOpen(film: Film): void {
    document.querySelector('.film-details')?.remove();

    const comments = mocksComments.filter((comment) => film.commentsIds.includes(comment.id));
    const popup = new Popup({ comments, film });
    document.body.append(popup.element);

    const popupCloseButtonElement = popup.element.querySelector('.film-details__close-btn');
    if (popupCloseButtonElement instanceof HTMLElement) {
      setTimeout(() => popupCloseButtonElement.focus());
    }
  }

  private _onWatchlistChange(film: Film): void {
    const { userDetails } = film;
    userDetails.inWatchlist = !userDetails.inWatchlist;
    this._navigationPanelView.updateFilmsSummary(getFilmsSummary(this._films));

    if (this._filter === Filter.Watchlist && !userDetails.inWatchlist) {
      this._filmsView.deleteFilmCard(film.id);
    }
  }

  private _onWatchedChange(film: Film): void {
    const { userDetails } = film;
    userDetails.isWatched = !userDetails.isWatched;
    userDetails.watchingDate = userDetails.isWatched ? new Date() : null;

    const filmsSummary = getFilmsSummary(this._films);
    this._navigationPanelView.updateFilmsSummary(filmsSummary);
    this._header.updateRank(getRank(filmsSummary.watchedFilmsCount));

    if (this._filter === Filter.Watched && !userDetails.isWatched) {
      this._filmsView.deleteFilmCard(film.id);
    }
  }

  private _onFavoriteChange(film: Film): void {
    const { userDetails } = film;
    userDetails.isFavorite = !userDetails.isFavorite;
    this._navigationPanelView.updateFilmsSummary(getFilmsSummary(this._films));

    if (this._filter === Filter.Favorite && !userDetails.isFavorite) {
      this._filmsView.deleteFilmCard(film.id);
    }
  }

  private _getFilteredFilms(): Film[] {
    return filterFilms(this._films, this._filter);
  }

  private _getShownFilms(): Film[] {
    const filteredFilms = this._getFilteredFilms();
    const sortedFilms = sortFilms(filteredFilms, this._sortType);
    return sortedFilms.slice(0, this._shownFilmsCount);
  }

  private _getInitShownFilmsCount(): number {
    return Math.min(FILMS_PORTION_SIZE, this._getFilteredFilms().length);
  }
}
