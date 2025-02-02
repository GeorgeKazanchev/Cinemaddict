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
    const title = areFilmsShown ? 'All movies. Upcoming' : 'There are no movies in our database';

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
    });
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public onPopupOpen(film: Film): void { }
}
