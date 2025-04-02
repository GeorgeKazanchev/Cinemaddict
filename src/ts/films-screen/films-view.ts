import AbstractView from '../abstract-view';
import { loadElementLazy } from '../dom-util';
import { Constants, Film } from '../model';
import Model from '../model/model';
import FilmCardView from './film-card-view';

const CONTAINER_HIDDEN_CLASSNAME = 'films-list__container--hidden';
const LIST_HIDDEN_CLASSNAME = 'films-list--hidden';

export default class FilmsView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
    this._filmCardViews = this._getFilmCardViews(this._model.shownFilms);
    this._topRatedFilmCardViews = this._getFilmCardViews(this._model.topRatedFilms);
    this._mostCommentedFilmCardViews = this._getFilmCardViews(this._model.mostCommentedFilms);
  }

  private _model: Model;
  private _filmCardViews: FilmCardView[];
  private _topRatedFilmCardViews: FilmCardView[];
  private _mostCommentedFilmCardViews: FilmCardView[];
  private _titleElement: Element | null = null;
  private _showMoreElement: Element | null = null;

  public get template(): string {
    const title = this._getTitle();

    const areTopRatedFilmsShown = this._model.topRatedFilms.length > 0;
    const areMostCommentedFilmsShown = this._model.mostCommentedFilms.length > 0;

    const topRatedFilms = `
      <section
        class="films-list films-list--extra films-list--top-rated
        ${areTopRatedFilmsShown ? '' : ' films-list--hidden'}"
      >
        <h3 class="films-list__title">Top rated</h3>
        <div class="films-list__container"></div>
      </section>`;

    const mostCommentedFilms = `
      <section
        class="films-list films-list--extra films-list--most-commented
        ${areMostCommentedFilmsShown ? '' : ' films-list--hidden'}"
      >
        <h3 class="films-list__title">Most commented</h3>
        <div class="films-list__container"></div>
      </section>`;

    return `
      <section class="films">
        <h2 class="visually-hidden">Films</h2>
        <section class="films-list">
          <h3 class="films-list__title ${this._model.areFilmsShown ? Constants.VISUALLY_HIDDEN_CLASSNAME : ''}">${title}</h3>
          <div class="films-list__container ${this._model.areFilmsShown ? '' : CONTAINER_HIDDEN_CLASSNAME}"></div>
          <button class="films-list__show-more button ${this._model.areAllFilmsShown ? Constants.HIDDEN_CLASSNAME : ''}">Show more</button>
        </section>
        ${topRatedFilms}
        ${mostCommentedFilms}
      </section>`;
  }

  public get element(): Element {
    const element = this.createElementLazy();
    const containerElement = element.querySelector('.films-list__container');
    if (containerElement) {
      this._filmCardViews.forEach((view) => {
        containerElement.append(view.element);
      });
    }
    return element;
  }

  public get titleElement(): Element {
    this._titleElement = loadElementLazy(
      this._titleElement,
      this.element,
      '.films-list__title',
      'The films title element is not found',
    );
    return this._titleElement;
  }

  public get showMoreElement(): Element {
    this._showMoreElement = loadElementLazy(
      this._showMoreElement,
      this.element,
      '.films-list__show-more',
      'The "Show more" button is not found',
    );
    return this._showMoreElement;
  }

  public bind(): void {
    const showMoreClickHandler = (evt: Event): void => {
      evt.preventDefault();
      this.onShowMore();
    };

    this.showMoreElement.addEventListener('click', showMoreClickHandler);

    this._filmCardViews.forEach((view) => { this._bindFilmCardListeners(view); });
    this._topRatedFilmCardViews.forEach((view) => { this._bindFilmCardListeners(view); });
    this._mostCommentedFilmCardViews.forEach((view) => { this._bindFilmCardListeners(view); });
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onShowMore(): void { }
  public onPopupOpen(film: Film): void { }
  public onWatchlistChange(film: Film): void { }
  public onWatchedChange(film: Film): void { }
  public onFavoriteChange(film: Film): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public updateShownFilms(): void {
    this._filmCardViews = this._getFilmCardViews(this._model.shownFilms);
    this._updateFilmsContainer();
    this.updateTitle();
    this.updateTopRatedFilms();
    this.updateMostCommentedFilms();
  }

  public updateWatchlistButton(film: Film): void {
    FilmsView._getFilmCardViewBy(this._filmCardViews, film.id)?.updateWatchlistButton();
    FilmsView._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateWatchlistButton();
    FilmsView._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)
      ?.updateWatchlistButton();
  }

  public updateWatchedButton(film: Film): void {
    FilmsView._getFilmCardViewBy(this._filmCardViews, film.id)?.updateWatchedButton();
    FilmsView._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateWatchedButton();
    FilmsView._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)?.updateWatchedButton();
  }

  public updateFavoriteButton(film: Film): void {
    FilmsView._getFilmCardViewBy(this._filmCardViews, film.id)?.updateFavoriteButton();
    FilmsView._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateFavoriteButton();
    FilmsView._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)?.updateFavoriteButton();
  }

  public updateCommentsCount(film: Film): void {
    FilmsView._getFilmCardViewBy(this._filmCardViews, film.id)?.updateCommentsCount();
    FilmsView._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateCommentsCount();
    FilmsView._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)?.updateCommentsCount();
  }

  public updateShowMoreButton(): void {
    if (this._model.areAllFilmsShown) {
      this.showMoreElement.classList.add(Constants.HIDDEN_CLASSNAME);
    } else {
      this.showMoreElement.classList.remove(Constants.HIDDEN_CLASSNAME);
    }
  }

  public updateTitle(): void {
    this.titleElement.className = `films-list__title ${this._model.areFilmsShown
      ? Constants.VISUALLY_HIDDEN_CLASSNAME
      : ''}`;
    this.titleElement.textContent = this._getTitle();
  }

  public updateTopRatedFilms(): void {
    this._updateExtraFilmsList(this._model.topRatedFilms, 'top-rated');
  }

  public updateMostCommentedFilms(): void {
    this._updateExtraFilmsList(this._model.mostCommentedFilms, 'most-commented');
  }

  public makeControlsEnabled(filmId: string, isEnabled: boolean): void {
    FilmsView._getFilmCardViewBy(this._filmCardViews, filmId)?.makeControlsEnabled(isEnabled);
    FilmsView._getFilmCardViewBy(this._topRatedFilmCardViews, filmId)
      ?.makeControlsEnabled(isEnabled);
    FilmsView._getFilmCardViewBy(this._mostCommentedFilmCardViews, filmId)
      ?.makeControlsEnabled(isEnabled);
  }

  public shakeControls(filmId: string): void {
    FilmsView._getFilmCardViewBy(this._filmCardViews, filmId)?.shakeControls();
    FilmsView._getFilmCardViewBy(this._topRatedFilmCardViews, filmId)?.shakeControls();
    FilmsView._getFilmCardViewBy(this._mostCommentedFilmCardViews, filmId)?.shakeControls();
  }

  private _getFilmCardViews(films: Film[]): FilmCardView[] {
    return films.map((film) => new FilmCardView({ model: this._model, filmId: film.id }));
  }

  private _updateFilmsContainer(): void {
    this._filmCardViews.forEach((view) => { this._bindFilmCardListeners(view); });

    const containerElement = this.element.querySelector('.films-list__container');
    if (!containerElement) {
      throw new Error('No main films container found');
    }

    if (this._model.areFilmsShown) {
      containerElement.classList.remove(CONTAINER_HIDDEN_CLASSNAME);
      containerElement.innerHTML = '';
      this._filmCardViews.forEach((view) => {
        containerElement.append(view.element);
      });
    } else {
      containerElement.classList.add(CONTAINER_HIDDEN_CLASSNAME);
    }
  }

  private _updateExtraFilmsList(films: Film[], listType: 'top-rated' | 'most-commented'): void {
    const filmCardViews = this._getFilmCardViews(films);
    filmCardViews.forEach((view) => { this._bindFilmCardListeners(view); });

    if (listType === 'top-rated') {
      this._topRatedFilmCardViews = filmCardViews;
    } else if (listType === 'most-commented') {
      this._mostCommentedFilmCardViews = filmCardViews;
    }

    const listElement = this.element.querySelector(`.films-list--${listType}`);
    if (!listElement) {
      throw new Error(`No extra list found with type ${listType}`);
    }

    if (filmCardViews.length > 0) {
      listElement.classList.remove(LIST_HIDDEN_CLASSNAME);
      const containerElement = listElement.querySelector('.films-list__container');
      if (containerElement) {
        containerElement.innerHTML = '';
        filmCardViews.forEach((view) => { containerElement.append(view.element); });
      }
    } else {
      listElement.classList.add(LIST_HIDDEN_CLASSNAME);
    }
  }

  private _getTitle(): string {
    switch (this._model.filmsLoadingState) {
      case 'pending':
        return 'Loading...';
      case 'error':
        return 'An error occurred. Try again later';
      case 'success':
        return this._model.areFilmsShown ? 'All movies. Upcoming' : 'There are no movies in our database';
      default:
        throw new Error('An incorrect films loading state is obtained');
    }
  }

  private _bindFilmCardListeners(view: FilmCardView): void {
    /* eslint-disable no-param-reassign */
    view.onPopupOpen = this.onPopupOpen.bind(this);
    view.onWatchlistChange = this.onWatchlistChange.bind(this);
    view.onWatchedChange = this.onWatchedChange.bind(this);
    view.onFavoriteChange = this.onFavoriteChange.bind(this);
    /* eslint-enable no-param-reassign */
  }

  private static _getFilmCardViewBy(views: FilmCardView[], filmId: string): FilmCardView | null {
    return views.find((view) => view.filmId === filmId) ?? null;
  }
}
