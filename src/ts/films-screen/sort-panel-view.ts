import AbstractView from '../abstract-view';
import { SortType } from '../model';
import Model from '../model/model';
import { getTargetAsElement } from '../util';

const ACTIVE_CLASSNAME = 'sort__button--active';

const hrefsToSortTypes = new Map<string, SortType>();
hrefsToSortTypes.set('#default', SortType.Default);
hrefsToSortTypes.set('#date', SortType.Date);
hrefsToSortTypes.set('#rating', SortType.Rating);

export default class SortPanelView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    const { sortType } = this._model.state;

    return `
      <ul class="sort">
        <li>
          <a href="#default" class="link sort__button ${sortType === SortType.Default ? ACTIVE_CLASSNAME : ''}">
            Sort by default
          </a>
        </li>
        <li>
          <a href="#date" class="link sort__button ${sortType === SortType.Date ? ACTIVE_CLASSNAME : ''}">
            Sort by date
          </a>
        </li>
        <li>
          <a href="#rating" class="link sort__button ${sortType === SortType.Rating ? ACTIVE_CLASSNAME : ''}">
            Sort by rating
          </a>
        </li>
      </ul>`;
  }

  public get element(): Element {
    const element = this.createElementLazy();
    this._updateVisibility(element);
    return element;
  }

  public bind(): void {
    const sortButtonElements = this.element.querySelectorAll('.sort__button');

    sortButtonElements.forEach((element) => {
      element.addEventListener('click', (evt: Event) => {
        evt.preventDefault();
        const linkElement = getTargetAsElement(evt).closest('.sort__button');
        if (!(linkElement instanceof HTMLAnchorElement)) {
          return;
        }

        const href = linkElement.getAttribute('href');
        if (!href) {
          return;
        }

        const sortType = hrefsToSortTypes.get(href);
        if (sortType) {
          this.onSort(sortType);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onSort(sortType: SortType): void { }

  public updateActiveSortType(): void {
    const activeSortTypeElement = this.element.querySelector(`.${ACTIVE_CLASSNAME}`);
    if (activeSortTypeElement) {
      activeSortTypeElement.classList.remove(ACTIVE_CLASSNAME);
    }

    const { sortType } = this._model.state;
    const sortTypeHrefPair = [...hrefsToSortTypes].find(([, value]) => value === sortType);
    if (!sortTypeHrefPair) {
      throw new Error(`No href found matching sort type ${sortType}`);
    }

    const newActiveSortTypeElement = this.element.querySelector(`[href="${sortTypeHrefPair[0]}"]`);
    newActiveSortTypeElement?.classList.add(ACTIVE_CLASSNAME);
  }

  public updateVisibility(): void {
    this._updateVisibility(this.element);
  }

  private _updateVisibility(element: Element): void {
    const isVisible = this._model.areFilmsShown;
    if (isVisible) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }
}
