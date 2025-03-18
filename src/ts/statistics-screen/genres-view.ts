import AbstractView from '../abstract-view';
import { getFilmsCountByGenres } from '../model/get-statistics';
import Model from '../model/model';

export default class GenresView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    const areFilmsExist = this._model.watchedFilmsInPeriod.length > 0;
    const listItems = this._getListItemsTemplate();

    return `
      <section class="statistic__genres">
        <h2 class="statistic__genres-title ${areFilmsExist ? '' : 'visually-hidden'}">
          Films count by genres
        </h2>
        <ol class="statistic__genres-list">
          ${listItems}
        </ol>
      </section>`;
  }

  public updateGenres(): void {
    const titleElement = this.element.querySelector('.statistic__genres-title');
    if (!titleElement) {
      throw new Error('No title for the statistics by genres found');
    }

    const areFilmsExist = this._model.watchedFilmsInPeriod.length > 0;
    if (areFilmsExist) {
      titleElement.classList.remove('visually-hidden');
    } else {
      titleElement.classList.add('visually-hidden');
    }

    const listElement = this.element.querySelector('.statistic__genres-list');
    if (!listElement) {
      throw new Error('No list with the statistics by genres found');
    }

    listElement.innerHTML = this._getListItemsTemplate();
  }

  private _getListItemsTemplate(): string {
    const films = this._model.watchedFilmsInPeriod;
    const genresData = Array.from(getFilmsCountByGenres(films));
    genresData.sort((a, b) => b[1] - a[1]);

    return genresData.map(([genre, filmsCount], index) => this
      ._getListItemTemplate(index + 1, genre, filmsCount)).join('');
  }

  private _getListItemTemplate(position: number, genre: string, filmsCount: number): string {
    return `
      <li class="statistic__genres-item">
        ${position.toFixed(0)}. ${genre} <span class="statistic__films-count">${filmsCount}</span>
      </li>`;
  }
}
