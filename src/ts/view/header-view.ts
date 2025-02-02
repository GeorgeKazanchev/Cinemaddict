import AbstractView from './abstract-view';

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
    const profile = this._rank
      ? `<section class="header__profile profile">
        <p class="profile__rating">${this._rank}</p>
        <img class="profile__avatar" src="img/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
      : '';

    return `
      <header class="header">
        <h1 class="header__logo logo">Cinemaddict</h1>
        ${profile}
      </header>`;
  }
}
