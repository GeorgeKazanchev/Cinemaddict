import AbstractView from '../abstract-view';
import FilmCardView from './film-card-view';
import type Film from '../../model/types/film';

const HIDDEN_CLASSNAME = 'hidden';

type Props = {
  areAllShown?: boolean;
  films: Film[];
};

export default class FilmsView extends AbstractView {
  constructor({ films, areAllShown }: Props) {
    super();
    this._films = films;
    this._filmCardViews = films.map((film) => new FilmCardView({ film }));
    this._areAllShown = areAllShown ?? true;
  }

  private _films: Film[];
  private _filmCardViews: FilmCardView[];
  private _areAllShown: boolean;

  public get template(): string {
    const areFilmsShown = this._films.length > 0;
    const title = this._getTitle(areFilmsShown);

    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title ${areFilmsShown ? 'visually-hidden' : ''}">${title}</h2>
          ${areFilmsShown ? '<div class="films-list__container"></div>' : ''}
          <button class="films-list__show-more button ${this._areAllShown ? HIDDEN_CLASSNAME : ''}">Show more</button>
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

    /* eslint-disable no-param-reassign */
    this._filmCardViews.forEach((view) => {
      view.onPopupOpen = this.onPopupOpen.bind(this);
      view.onWatchlistChange = this.onWatchlistChange.bind(this);
      view.onWatchedChange = this.onWatchedChange.bind(this);
      view.onFavoriteChange = this.onFavoriteChange.bind(this);
    });
    /* eslint-enable no-param-reassign */
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onShowMore(): void { }
  public onPopupOpen(film: Film): void { }
  public onWatchlistChange(film: Film): void { }
  public onWatchedChange(film: Film): void { }
  public onFavoriteChange(film: Film): void { }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public updateFilms(films: Film[]): void {
    this._films = films;
    this._filmCardViews = films.map((film) => new FilmCardView({ film }));

    const areFilmsShown = this._films.length > 0;
    this._updateTitle(areFilmsShown);
    this._updateFilmsContainer(areFilmsShown);
    this.bind();
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

  public updateShowMoreButton(areAllShown: boolean): void {
    this._areAllShown = areAllShown;

    const showMoreElement = this.element.querySelector('.films-list__show-more');
    if (!showMoreElement) {
      throw new Error('The "Show more" button is not found');
    }

    if (areAllShown) {
      showMoreElement.classList.add(HIDDEN_CLASSNAME);
    } else {
      showMoreElement.classList.remove(HIDDEN_CLASSNAME);
    }
  }

  public deleteFilmCard(filmId: string): void {
    const filmCardView = this._filmCardViews.find((view) => view.filmId === filmId);
    if (filmCardView) {
      filmCardView.element.remove();
    }
  }

  private _updateTitle(areFilmsShown: boolean): void {
    const title = this._getTitle(areFilmsShown);
    const titleElement = this.element.querySelector('.films-list__title');
    if (titleElement) {
      titleElement.className = `films-list__title ${areFilmsShown ? 'visually-hidden' : ''}`;
      titleElement.textContent = title;
    }
  }

  private _updateFilmsContainer(areFilmsShown: boolean): void {
    let filmsContainerElement = this.element.querySelector('.films-list__container');

    if (areFilmsShown) {
      if (!filmsContainerElement) {
        filmsContainerElement = document.createElement('div');
        filmsContainerElement.classList.add('films-list__container');
      }

      filmsContainerElement.innerHTML = '';
      this._filmCardViews.forEach((view) => {
        filmsContainerElement!.append(view.element);
      });
    } else if (filmsContainerElement) {
      filmsContainerElement.remove();
    }
  }

  private _getTitle(areFilmsShown: boolean): string {
    return areFilmsShown ? 'All movies. Upcoming' : 'There are no movies in our database';
  }

  private _getFilmCardViewBy(filmId: string): FilmCardView | null {
    return this._filmCardViews.find((view) => view.filmId === filmId) ?? null;
  }
}
