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
        <img class="statistic__img" src="img/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${this._rank}</span>
      </p>`;
  }
}
