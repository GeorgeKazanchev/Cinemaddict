import AbstractView from './abstract-view';
import { getRank } from './model';
import Model from './model/model';
import { getElementFromTemplate } from './util';

export default class HeaderView extends AbstractView {
  constructor(model: Model) {
    super();
    this._model = model;
  }

  private _model: Model;

  public get template(): string {
    const rank = getRank(this._model.filmsSummary.watchedFilmsCount);
    const profile = this._getProfileTemplate(rank);

    return `
      <header class="header">
        <h1 class="header__logo logo">Cinemaddict</h1>
        <button class="header__menu-toggler button" type="button" aria-label="Toggle menu"></button>
        ${profile}
      </header>`;
  }

  public bind(): void {
    const menuTogglerElement = this.element.querySelector('.header__menu-toggler');
    if (!menuTogglerElement) {
      throw new Error('No navigation menu toggler element found');
    }

    const menuTogglerClickHandler = (evt: Event) => {
      evt.preventDefault();
      this.onMenuToggle();
      menuTogglerElement.classList.toggle('header__menu-toggler--expanded');
    };

    menuTogglerElement.addEventListener('click', menuTogglerClickHandler);
  }

  public onMenuToggle(): void { }

  public updateRank(): void {
    const rank = getRank(this._model.filmsSummary.watchedFilmsCount);
    let profileElement = this.element.querySelector('.profile');
    if (rank) {
      if (!profileElement) {
        profileElement = getElementFromTemplate(this._getProfileTemplate(rank));
        this.element.append(profileElement);
      } else {
        const ratingElement = this.element.querySelector('.profile__rating');
        if (ratingElement) {
          ratingElement.textContent = rank;
        }
      }
    } else if (profileElement) {
      profileElement.remove();
    }
  }

  private _getProfileTemplate(rank: string): string {
    return (
      rank
        ? `<section class="header__profile profile">
            <p class="profile__rating">${rank}</p>
            <img class="profile__avatar" src="img/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`
        : ''
    );
  }
}
