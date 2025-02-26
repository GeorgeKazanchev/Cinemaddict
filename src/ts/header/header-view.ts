import AbstractView from '../abstract-view';
import { getElementFromTemplate } from '../util';

type Props = {
  rank: string;
};

export default class HeaderView extends AbstractView {
  constructor({ rank }: Props) {
    super();
    this._rank = rank;
  }

  private _rank: string;

  public get template(): string {
    const profile = this._getProfileTemplate(this._rank);

    return `
      <header class="header">
        <h1 class="header__logo logo">Cinemaddict</h1>
        ${profile}
      </header>`;
  }

  public updateRank(rank: string): void {
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
