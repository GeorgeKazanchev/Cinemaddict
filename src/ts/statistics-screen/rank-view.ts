import AbstractView from '../abstract-view';

export default class RankView extends AbstractView {
  constructor(rank: string) {
    super();
    this._rank = rank;
  }

  private _rank: string;

  public get template(): string {
    return `
      <p class="statistic__rank">
        Your rank
        <span class="statistic__rank-content">
          <picture>
            <source type="image/webp" srcset="img/bitmap.webp 1x, img/bitmap@2x.webp 2x, img/bitmap@3x.webp 3x">
            <img class="statistic__img" src="img/bitmap.png" srcset="img/bitmap@2x.png 2x, img/bitmap@3x.png 3x"
              alt="Avatar" width="35" height="35">
          </picture>
          <span class="statistic__rank-label">${this._rank}</span>
        </span>
      </p>`;
  }
}
