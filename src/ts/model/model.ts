import { State } from '../data/data';
import {
  Comment,
  Constants,
  Film,
  FilmsSummary,
  Filter,
  filterFilms,
  sortFilms,
  SortType,
  Statistics,
  StatisticsPeriod,
} from '.';

type LoadingState = 'pending' | 'success' | 'error';

export default class Model {
  constructor(state: State) {
    this._state = state;
    this.filmsLoadingState = 'pending';
    this.commentsLoadingStates = this._getCommentsLoadingStates(this._state.films);
  }

  private _state: State;

  public filmsLoadingState: LoadingState;
  public commentsLoadingStates: Map<string, LoadingState>;

  public get state(): State {
    return Object.freeze(this._state);
  }

  public get filteredFilms(): Film[] {
    return filterFilms(this._state.films, this._state.filter);
  }

  public get shownFilms(): Film[] {
    const sortedFilms = sortFilms(this.filteredFilms, this._state.sortType);
    return sortedFilms.slice(0, this._state.shownFilmsCount);
  }

  public get filmsSummary(): FilmsSummary {
    return Statistics.getFilmsSummary(this._state.films);
  }

  public get initShownFilmsCount(): number {
    return this._getInitShownFilmsCount(this._state.filter);
  }

  public get watchedFilmsInPeriod(): Film[] {
    const statisticsStartDate = Statistics.getStatisticsStartDate(this._state.period);
    return Statistics.getWatchedFilmsSince(statisticsStartDate, this._state.films);
  }

  public get areFilmsShown(): boolean {
    return this.shownFilms.length > 0;
  }

  public get areAllFilmsShown(): boolean {
    return this._state.shownFilmsCount >= this.filteredFilms.length;
  }

  public getComments(filmId: string): Comment[] {
    const { commentsIds } = this.getFilmById(filmId);
    return this._state.comments.filter((comment) => commentsIds.includes(comment.id));
  }

  public getCommentsCount(filmId: string): number {
    const { commentsIds } = this.getFilmById(filmId);
    return commentsIds.length;
  }

  public getFilmById(id: string): Film {
    const film = this._state.films.find((item) => item.id === id);
    if (!film) {
      throw new Error(`Not film found with id ${id}`);
    }
    return film;
  }

  public getCommentById(id: string): Comment {
    const comment = this._state.comments.find((item) => item.id === id);
    if (!comment) {
      throw new Error(`Not comment found with id ${id}`);
    }
    return comment;
  }

  public setFilms(films: Film[]): void {
    this._state = {
      ...this._state,
      films,
    };

    this.commentsLoadingStates = this._getCommentsLoadingStates(films);
  }

  public setFilter(filter: Filter): void {
    this._state = {
      ...this._state,
      filter,
      sortType: SortType.Default,
      shownFilmsCount: this._getInitShownFilmsCount(filter),
    };
  }

  public setSortType(sortType: SortType): void {
    this._state = {
      ...this._state,
      sortType,
      shownFilmsCount: this.initShownFilmsCount,
    };
  }

  public setStatisticsPeriod(period: StatisticsPeriod): void {
    this._state = { ...this._state, period };
  }

  public addComments(comments: Comment[]): void {
    this._state = {
      ...this._state,
      comments: this._state.comments.concat(comments),
    };
  }

  public resetShownFilms(): void {
    const shownFilmsCount = Math.min(Constants.FILMS_PORTION_SIZE, this.filteredFilms.length);
    this._state = { ...this._state, shownFilmsCount };
  }

  public increaseShownFilms(): void {
    const filmsLeftCount = this.filteredFilms.length - this.shownFilms.length;
    const delta = Math.min(Constants.FILMS_PORTION_SIZE, filmsLeftCount);
    const shownFilmsCount = this._state.shownFilmsCount + delta;
    this._state = { ...this._state, shownFilmsCount };
  }

  public deleteComment(comment: Comment, filmId: string): void {
    const film = this.getFilmById(filmId);

    const { commentsIds } = film;
    const commentIdIndex = commentsIds.indexOf(comment.id);
    commentsIds.splice(commentIdIndex, 1);

    const comments = this._state.comments.filter((item) => item.id !== comment.id);
    this._state = { ...this._state, comments };
  }

  public onWatchlistChange(film: Film): void {
    const { userDetails } = film;
    userDetails.inWatchlist = !userDetails.inWatchlist;
  }

  public onWatchedChange(film: Film): void {
    const { userDetails } = film;
    userDetails.isWatched = !userDetails.isWatched;
    userDetails.watchingDate = userDetails.isWatched ? new Date() : null;
  }

  public onFavoriteChange(film: Film): void {
    const { userDetails } = film;
    userDetails.isFavorite = !userDetails.isFavorite;
  }

  private _getCommentsLoadingStates(films: Film[]): Map<string, LoadingState> {
    const commentsLoadingStates = new Map<string, LoadingState>();
    films.forEach((film) => {
      commentsLoadingStates.set(film.id, 'pending');
    });
    return commentsLoadingStates;
  }

  private _getInitShownFilmsCount(filter: Filter): number {
    const filteredFilms = filterFilms(this._state.films, filter);
    return Math.min(Constants.FILMS_PORTION_SIZE, filteredFilms.length);
  }
}
