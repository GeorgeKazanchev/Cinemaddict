import Api from '../api/api';
import Application from '../application';
import FooterView from '../footer-view';
import HeaderView from '../header-view';
import {
  Film,
  Filter,
  SortType,
} from '../model';
import Model from '../model/model';
import NavigationPanelView from '../navigation-panel-view';
import Popup from '../popup/popup';
import FilmsView from './films-view';
import SortPanelView from './sort-panel-view';

export default class FilmsScreen {
  constructor(model: Model) {
    this._model = model;

    this._loadFilms();

    this._headerView = new HeaderView(this._model);
    this._filmsView = new FilmsView(this._model);
    this._sortPanelView = new SortPanelView(this._model);
    this._navigationPanelView = new NavigationPanelView({
      model: this._model,
      isFilmsScreen: true,
    });
    this._footerView = new FooterView(this._model);

    this._navigationPanelView.onFiltration = this._onFiltration.bind(this);
    this._navigationPanelView.onStatisticsOpen = this._onStatisticsOpen.bind(this);
    this._sortPanelView.onSort = this._onSort.bind(this);
    this._filmsView.onShowMore = this._onShowMore.bind(this);
    this._filmsView.onPopupOpen = this._onPopupOpen.bind(this);
    this._filmsView.onWatchlistChange = this._onWatchlistChange.bind(this);
    this._filmsView.onWatchedChange = this._onWatchedChange.bind(this);
    this._filmsView.onFavoriteChange = this._onFavoriteChange.bind(this);
  }

  private _model: Model;
  private _headerView: HeaderView;
  private _navigationPanelView: NavigationPanelView;
  private _sortPanelView: SortPanelView;
  private _filmsView: FilmsView;
  private _footerView: FooterView;
  private _element: Element | null = null;

  public get element(): Element {
    if (this._element) {
      return this._element;
    }

    const mainElement = document.createElement('main');
    mainElement.classList.add('main');
    mainElement.append(this._navigationPanelView.element);
    mainElement.append(this._sortPanelView.element);
    mainElement.append(this._filmsView.element);

    this._element = document.createElement('div');
    this._element.append(this._headerView.element);
    this._element.append(mainElement);
    this._element.append(this._footerView.element);

    return this._element;
  }

  private _loadFilms(): void {
    Api.loadFilms()
      .then((films) => {
        this._model.setFilms(films);
        this._model.filmsLoadingState = 'success';
      })
      .then(() => {
        this._headerView.updateRank();
        this._filmsView.updateShownFilms();
        this._filmsView.updateShowMoreButton();
        this._navigationPanelView.updateFilmsSummary();
        this._sortPanelView.updateVisibility();
        this._footerView.updateFilmsCount();
      })
      .catch(() => {
        this._model.filmsLoadingState = 'error';
        this._filmsView.updateShownFilms();
      });
  }

  private _onFiltration(selectedFilter: Filter): void {
    const { state } = this._model;
    if (state.filter !== selectedFilter) {
      this._model.setFilter(selectedFilter);
      this._filmsView.updateShownFilms();
      this._filmsView.updateShowMoreButton();
      this._navigationPanelView.updateActiveFilter();
      this._sortPanelView.updateActiveSortType();
      this._sortPanelView.updateVisibility();
    }
  }

  private _onStatisticsOpen(): void {
    Application.showStatistics(this._model.state);
  }

  private _onSort(selectedSortType: SortType): void {
    const { state } = this._model;
    if (state.sortType !== selectedSortType) {
      this._model.setSortType(selectedSortType);
      this._filmsView.updateShownFilms();
      this._filmsView.updateShowMoreButton();
      this._sortPanelView.updateActiveSortType();
    }
  }

  private _onShowMore(): void {
    this._model.increaseShownFilms();
    this._filmsView.updateShownFilms();
    this._filmsView.updateShowMoreButton();
  }

  private _onPopupOpen(film: Film): void {
    document.querySelector('.film-details')?.remove();

    const popup = new Popup({
      model: this._model,
      filmId: film.id,
      onWatchlistChange: this._onWatchlistChange.bind(this),
      onWatchedChange: this._onWatchedChange.bind(this),
      onFavoriteChange: this._onFavoriteChange.bind(this),
      onCommentDelete: this._onCommentDelete.bind(this, film),
    });

    document.body.append(popup.element);

    const popupCloseButtonElement = popup.element.querySelector('.film-details__close-btn');
    if (popupCloseButtonElement instanceof HTMLElement) {
      setTimeout(() => popupCloseButtonElement.focus());
    }
  }

  private _onWatchlistChange(film: Film): void {
    const { state } = this._model;

    this._model.onWatchlistChange(film);
    this._navigationPanelView.updateFilmsSummary();
    this._filmsView.updateWatchlistButton(film);

    if (state.filter === Filter.Watchlist) {
      this._updateFilmsSection();
    }
  }

  private _onWatchedChange(film: Film): void {
    this._model.onWatchedChange(film);

    const { state } = this._model;
    this._navigationPanelView.updateFilmsSummary();
    this._filmsView.updateWatchedButton(film);
    this._headerView.updateRank();

    if (state.filter === Filter.Watched) {
      this._updateFilmsSection();
    }
  }

  private _onFavoriteChange(film: Film): void {
    const { state } = this._model;

    this._model.onFavoriteChange(film);
    this._navigationPanelView.updateFilmsSummary();
    this._filmsView.updateFavoriteButton(film);

    if (state.filter === Filter.Favorite) {
      this._updateFilmsSection();
    }
  }

  private _updateFilmsSection(): void {
    this._filmsView.updateShownFilms();
    this._filmsView.updateShowMoreButton();
    this._sortPanelView.updateVisibility();
  }

  private _onCommentDelete(film: Film): void {
    this._filmsView.updateCommentsCount(film);
  }
}
