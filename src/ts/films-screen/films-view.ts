import AbstractView from '../abstract-view';
import { Constants, Film } from '../model';
import Model from '../model/model';
import FilmCardView from './film-card-view';

export default class FilmsView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
    this._filmCardViews = this._model.shownFilms
      .map((film) => new FilmCardView({ model, filmId: film.id }));
  }

  private _model: Model;
  private _filmCardViews: FilmCardView[];

  public get template(): string {
    const title = this._getTitle();

    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title ${this._model.areFilmsShown ? 'visually-hidden' : ''}">${title}</h2>
          ${this._model.areFilmsShown ? '<div class="films-list__container"></div>' : ''}
          <button class="films-list__show-more button ${this._model.areAllFilmsShown ? Constants.HIDDEN_CLASSNAME : ''}">Show more</button>
        </section>
      </section>`;
  }

  public get element(): Element {
    const element = super.element;
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
    this._bindFilmCardsListeners();
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onShowMore(): void { }
  public onPopupOpen(film: Film): void { }
  public onWatchlistChange(film: Film): void { }
  public onWatchedChange(film: Film): void { }
  public onFavoriteChange(film: Film): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public updateShownFilms(): void {
    this._filmCardViews = this._model.shownFilms
      .map((film) => new FilmCardView({ model: this._model, filmId: film.id }));
    this._bindFilmCardsListeners();
    this._updateFilmsContainer();
    this.updateTitle();
  }

  public updateWatchlistButton(film: Film): void {
    const filmCardView = this._getFilmCardViewBy(film.id);
    filmCardView?.updateWatchlistButton();
  }

  public updateWatchedButton(film: Film): void {
    const filmCardView = this._getFilmCardViewBy(film.id);
    filmCardView?.updateWatchedButton();
  }

  public updateFavoriteButton(film: Film): void {
    const filmCardView = this._getFilmCardViewBy(film.id);
    filmCardView?.updateFavoriteButton();
  }

  public updateCommentsCount(film: Film): void {
    const filmCardView = this._getFilmCardViewBy(film.id);
    filmCardView?.updateCommentsCount();
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

  private _updateFilmsContainer(): void {
    let filmsContainerElement = this.element.querySelector('.films-list__container');

    if (this._model.areFilmsShown) {
      if (!filmsContainerElement) {
        filmsContainerElement = document.createElement('div');
        filmsContainerElement.classList.add('films-list__container');

        const titleElement = this.element.querySelector('.films-list__title');
        if (!titleElement) {
          throw new Error('No title element found');
        }

        titleElement.after(filmsContainerElement);
      }

      filmsContainerElement.innerHTML = '';
      this._filmCardViews.forEach((view) => {
        filmsContainerElement!.append(view.element);
      });
    } else if (filmsContainerElement) {
      filmsContainerElement.remove();
    }
  }

  private _getTitle(): string {
    return this._model.areFilmsShown ? 'All movies. Upcoming' : 'There are no movies in our database';
  }

  private _getFilmCardViewBy(filmId: string): FilmCardView | null {
    return this._filmCardViews.find((view) => view.filmId === filmId) ?? null;
  }

  private _bindFilmCardsListeners(): void {
    /* eslint-disable no-param-reassign */
    this._filmCardViews.forEach((view) => {
      view.onPopupOpen = this.onPopupOpen.bind(this);
      view.onWatchlistChange = this.onWatchlistChange.bind(this);
      view.onWatchedChange = this.onWatchedChange.bind(this);
      view.onFavoriteChange = this.onFavoriteChange.bind(this);
    });
    /* eslint-enable no-param-reassign */
  }
}
