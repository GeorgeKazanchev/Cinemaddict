import AbstractView from '../abstract-view';
import FilmCardView from './film-card-view';
import type Film from '../../model/types/film';

type Props = {
  films: Film[];
};

export default class FilmsView extends AbstractView {
  constructor({ films }: Props) {
    super();
    this._films = films;
    this._filmCardViews = films.map((film) => new FilmCardView({ film }));
  }

  private _films: Film[];
  private _filmCardViews: FilmCardView[];

  public get template(): string {
    const areFilmsShown = this._films.length > 0;
    const title = this._getTitle(areFilmsShown);

    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title ${areFilmsShown ? 'visually-hidden' : ''}">${title}</h2>
          ${areFilmsShown ? '<div class="films-list__container"></div>' : ''}
          <button class="films-list__show-more button">Show more</button>
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
}
