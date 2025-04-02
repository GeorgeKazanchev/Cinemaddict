import AbstractView from '../abstract-view';
import { loadElementLazy } from '../dom-util';
import { Constants, Statistics } from '../model';
import Model from '../model/model';

export default class GenresView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;
  private _titleElement: Element | null = null;
  private _listElement: Element | null = null;

  public get template(): string {
    const areFilmsInPeriod = this._model.watchedFilmsInPeriod.length > 0;
    const listItems = this._getListItemsTemplate();

    return `
      <section class="statistic__genres">
        <h2 class="statistic__genres-title ${areFilmsInPeriod ? '' : Constants.VISUALLY_HIDDEN_CLASSNAME}">
          Films count by genres
        </h2>
        <ol class="statistic__genres-list">
          ${listItems}
        </ol>
      </section>`;
  }

  public get titleElement(): Element {
    this._titleElement = loadElementLazy(
      this._titleElement,
      this.element,
      '.statistic__genres-title',
      'No title for the statistics by genres found',
    );
    return this._titleElement;
  }

  public get listElement(): Element {
    this._listElement = loadElementLazy(
      this._listElement,
      this.element,
      '.statistic__genres-list',
      'No list with the statistics by genres found',
    );
    return this._listElement;
  }

  public updateGenres(): void {
    this.listElement.innerHTML = this._getListItemsTemplate();
    const areFilmsInPeriod = this._model.watchedFilmsInPeriod.length > 0;
    if (areFilmsInPeriod) {
      this.titleElement.classList.remove(Constants.VISUALLY_HIDDEN_CLASSNAME);
    } else {
      this.titleElement.classList.add(Constants.VISUALLY_HIDDEN_CLASSNAME);
    }
  }

  private _getListItemsTemplate(): string {
    const films = this._model.watchedFilmsInPeriod;
    const filmsCountByGenres = Statistics.getFilmsCountByGenresArray(films);
    return filmsCountByGenres.map(([genre, filmsCount], index) => GenresView
      ._getListItemTemplate(index + 1, genre, filmsCount)).join('');
  }

  private static _getListItemTemplate(
    numberInList: number,
    genre: string,
    filmsCount: number,
  ): string {
    return `
      <li class="statistic__genres-item">
        ${numberInList.toFixed(0)}. ${genre} <span class="statistic__films-count">${filmsCount}</span>
      </li>`;
  }
}
