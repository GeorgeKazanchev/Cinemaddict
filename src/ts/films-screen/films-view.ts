import AbstractView from '../abstract-view';
import { Constants, Film } from '../model';
import Model from '../model/model';
import FilmCardView from './film-card-view';

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

  public get template(): string {
    const title = this._getTitle();

    const areTopRatedShown = this._model.topRatedFilms.length > 0;
    const areMostCommentedShown = this._model.mostCommentedFilms.length > 0;

    const topRatedFilms = `
      <section
        class="films-list films-list--extra films-list--top-rated
        ${areTopRatedShown ? '' : ' films-list--hidden'}"
      >
        <h3 class="films-list__title">Top rated</h3>
        <div class="films-list__container"></div>
      </section>`;

    const mostCommentedFilms = `
      <section
        class="films-list films-list--extra films-list--most-commented
        ${areMostCommentedShown ? '' : ' films-list--hidden'}"
      >
        <h3 class="films-list__title">Most commented</h3>
        <div class="films-list__container"></div>
      </section>`;

    return `
      <section class="films">
        <h2 class="visually-hidden">Films</h2>
        <section class="films-list">
          <h3 class="films-list__title ${this._model.areFilmsShown ? 'visually-hidden' : ''}">${title}</h3>
          <div class="films-list__container ${this._model.areFilmsShown ? '' : 'films-list__container--hidden'}"></div>
          <button class="films-list__show-more button ${this._model.areAllFilmsShown ? Constants.HIDDEN_CLASSNAME : ''}">Show more</button>
        </section>
        ${topRatedFilms}
        ${mostCommentedFilms}
      </section>`;
  }

  public get element(): Element {
    const element = this.createElementLazy();
    const filmsContainerElement = element.querySelector('.films-list__container');
    if (filmsContainerElement && filmsContainerElement.children.length === 0) {
      this._filmCardViews.forEach((view) => {
        filmsContainerElement.append(view.element);
      });
    }
    return element;
  }

  public bind(): void {
    const showMoreElement = this.element.querySelector('.films-list__show-more');

    const showMoreClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onShowMore();
    };

    showMoreElement?.addEventListener('click', showMoreClickHandler);

    this._filmCardViews.forEach((view) => this._bindFilmCardListeners(view));
    this._topRatedFilmCardViews.forEach((view) => this._bindFilmCardListeners(view));
    this._mostCommentedFilmCardViews.forEach((view) => this._bindFilmCardListeners(view));
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
    this._getFilmCardViewBy(this._filmCardViews, film.id)?.updateWatchlistButton();
    this._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateWatchlistButton();
    this._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)?.updateWatchlistButton();
  }

  public updateWatchedButton(film: Film): void {
    this._getFilmCardViewBy(this._filmCardViews, film.id)?.updateWatchedButton();
    this._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateWatchedButton();
    this._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)?.updateWatchedButton();
  }

  public updateFavoriteButton(film: Film): void {
    this._getFilmCardViewBy(this._filmCardViews, film.id)?.updateFavoriteButton();
    this._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateFavoriteButton();
    this._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)?.updateFavoriteButton();
  }

  public updateCommentsCount(film: Film): void {
    this._getFilmCardViewBy(this._filmCardViews, film.id)?.updateCommentsCount();
    this._getFilmCardViewBy(this._topRatedFilmCardViews, film.id)?.updateCommentsCount();
    this._getFilmCardViewBy(this._mostCommentedFilmCardViews, film.id)?.updateCommentsCount();
  }

  public updateShowMoreButton(): void {
    const showMoreElement = this.element.querySelector('.films-list__show-more');
    if (!showMoreElement) {
      throw new Error('The "Show more" button is not found');
    }

    if (this._model.areAllFilmsShown) {
      showMoreElement.classList.add(Constants.HIDDEN_CLASSNAME);
    } else {
      showMoreElement.classList.remove(Constants.HIDDEN_CLASSNAME);
    }
  }

  public updateTitle(): void {
    const title = this._getTitle();
    const titleElement = this.element.querySelector('.films-list__title');

    if (titleElement) {
      titleElement.className = `films-list__title ${this._model.areFilmsShown ? 'visually-hidden' : ''}`;
      titleElement.textContent = title;
    }
  }

  public updateTopRatedFilms(): void {
    this._topRatedFilmCardViews = this._getFilmCardViews(this._model.topRatedFilms);
    this._topRatedFilmCardViews.forEach((view) => this._bindFilmCardListeners(view));

    const filmsListElement = this.element.querySelector('.films-list--top-rated');
    if (!(filmsListElement instanceof HTMLElement)) {
      throw new Error('No top rated films list found');
    }

    if (this._topRatedFilmCardViews.length > 0) {
      filmsListElement.classList.remove('films-list--hidden');
      const containerElement = filmsListElement.querySelector('.films-list__container');
      if (containerElement) {
        containerElement.innerHTML = '';
        this._topRatedFilmCardViews.forEach((view) => {
          containerElement.append(view.element);
        });
      }
    } else {
      filmsListElement.classList.add('films-list--hidden');
    }
  }

  public updateMostCommentedFilms(): void {
    this._mostCommentedFilmCardViews = this._getFilmCardViews(this._model.mostCommentedFilms);
    this._mostCommentedFilmCardViews.forEach((view) => this._bindFilmCardListeners(view));

    const filmsListElement = this.element.querySelector('.films-list--most-commented');
    if (!(filmsListElement instanceof HTMLElement)) {
      throw new Error('No most commented films list found');
    }

    if (this._mostCommentedFilmCardViews.length > 0) {
      filmsListElement.classList.remove('films-list--hidden');
      const containerElement = filmsListElement.querySelector('.films-list__container');
      if (containerElement) {
        containerElement.innerHTML = '';
        this._mostCommentedFilmCardViews.forEach((view) => {
          containerElement.append(view.element);
        });
      }
    } else {
      filmsListElement.classList.add('films-list--hidden');
    }
  }

  public makeControlsEnabled(filmId: string, isEnabled: boolean): void {
    this._getFilmCardViewBy(this._filmCardViews, filmId)?.makeControlsEnabled(isEnabled);
    this._getFilmCardViewBy(this._topRatedFilmCardViews, filmId)?.makeControlsEnabled(isEnabled);
    this._getFilmCardViewBy(this._mostCommentedFilmCardViews, filmId)
      ?.makeControlsEnabled(isEnabled);
  }

  public shakeControls(filmId: string): void {
    this._getFilmCardViewBy(this._filmCardViews, filmId)?.shakeControls();
    this._getFilmCardViewBy(this._topRatedFilmCardViews, filmId)?.shakeControls();
    this._getFilmCardViewBy(this._mostCommentedFilmCardViews, filmId)?.shakeControls();
  }

  private _getFilmCardViews(films: Film[]): FilmCardView[] {
    return films.map((film) => new FilmCardView({ model: this._model, filmId: film.id }));
  }

  private _updateFilmsContainer(): void {
    this._filmCardViews.forEach((view) => this._bindFilmCardListeners(view));

    const containerElement = this.element.querySelector('.films-list__container');
    if (!(containerElement instanceof HTMLElement)) {
      throw new Error('No main films container found');
    }

    if (this._model.areFilmsShown) {
      containerElement.classList.remove('films-list__container--hidden');
      containerElement.innerHTML = '';
      this._filmCardViews.forEach((view) => {
        containerElement.append(view.element);
      });
    } else {
      containerElement.classList.add('films-list__container--hidden');
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

  private _getFilmCardViewBy(views: FilmCardView[], filmId: string): FilmCardView | null {
    return views.find((view) => view.filmId === filmId) ?? null;
  }

  private _bindFilmCardListeners(view: FilmCardView): void {
    /* eslint-disable no-param-reassign */
    view.onPopupOpen = this.onPopupOpen.bind(this);
    view.onWatchlistChange = this.onWatchlistChange.bind(this);
    view.onWatchedChange = this.onWatchedChange.bind(this);
    view.onFavoriteChange = this.onFavoriteChange.bind(this);
    /* eslint-enable no-param-reassign */
  }
}
