import { State } from '../data/data';
import { MOST_COMMENTED_FILMS_COUNT, TOP_RATED_FILMS_COUNT } from './consts';
import { getMostCommentedFilms, getTopRatedFilms } from './get-top-films';
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
    this.commentsLoadingStates = Model._getInitCommentsLoadingStates(this._state.films);
  }

  private _state: State;

  public filmsLoadingState: LoadingState;
  public commentsLoadingStates: Map<string, LoadingState>; // Число состояний равно числу фильмов

  public get state(): State {
    return Object.freeze(this._state);
  }

  public get filteredFilms(): Film[] {
    return filterFilms(this._state.films, this._state.filter);
  }

  public get sortedFilms(): Film[] {
    return sortFilms(this.filteredFilms, this._state.sortType);
  }

  public get shownFilms(): Film[] {
    return this.sortedFilms.slice(0, this._state.shownFilmsCount);
  }

  public get topRatedFilms(): Film[] {
    return getTopRatedFilms(this._state.films, TOP_RATED_FILMS_COUNT);
  }

  public get mostCommentedFilms(): Film[] {
    return getMostCommentedFilms(this._state.films, MOST_COMMENTED_FILMS_COUNT);
  }

  public get filmsSummary(): FilmsSummary {
    return Statistics.getFilmsSummary(this._state.films);
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
      throw new Error(`No film found with id ${id}`);
    }
    return film;
  }

  public getCommentById(id: string): Comment {
    const comment = this._state.comments.find((item) => item.id === id);
    if (!comment) {
      throw new Error(`No comment found with id ${id}`);
    }
    return comment;
  }

  public setFilms(films: Film[]): void {
    this._state = {
      ...this._state,
      films,
      shownFilmsCount: Model._getInitShownFilmsCount(films, this._state.filter),
    };

    this.commentsLoadingStates = Model._getInitCommentsLoadingStates(films);
  }

  public setFilter(filter: Filter): void {
    this._state = {
      ...this._state,
      filter,
      sortType: SortType.Default,
      shownFilmsCount: Model._getInitShownFilmsCount(this._state.films, filter),
    };
  }

  public setSortType(sortType: SortType): void {
    this._state = {
      ...this._state,
      sortType,
      shownFilmsCount: Model._getInitShownFilmsCount(this._state.films, this._state.filter),
    };
  }

  public setStatisticsPeriod(period: StatisticsPeriod): void {
    this._state = { ...this._state, period };
  }

  public updateCommentsForFilm(film: Film, comments: Comment[]): void {
    const foundFilm = this.getFilmById(film.id);
    const commentsNotRelatedToFilm = this._state.comments.filter((comment) => (
      !foundFilm.commentsIds.includes(comment.id)
    ));

    foundFilm.commentsIds = comments.map((comment) => comment.id);

    this._state = {
      ...this._state,
      comments: commentsNotRelatedToFilm.concat(comments),
    };
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
    if (commentIdIndex === -1) {
      throw new Error(`No comment found with id ${comment.id}`);
    }

    commentsIds.splice(commentIdIndex, 1);

    const comments = this._state.comments.filter((item) => item.id !== comment.id);
    this._state = { ...this._state, comments };
  }

  public updateFilm(film: Film): void {
    const filmIndex = this._state.films.findIndex((item) => item.id === film.id);
    if (filmIndex === -1) {
      throw new Error(`No film found with id ${film.id}`);
    }

    const updatedFilms = [...this._state.films];
    updatedFilms.splice(filmIndex, 1, film);

    this._state = {
      ...this._state,
      films: updatedFilms,
    };
  }

  private static _getInitCommentsLoadingStates(films: Film[]): Map<string, LoadingState> {
    return films.reduce((states, film) => {
      states.set(film.id, 'pending');
      return states;
    }, new Map<string, LoadingState>());
  }

  private static _getInitShownFilmsCount(films: Film[], filter: Filter): number {
    const filteredFilms = filterFilms(films, filter);
    return Math.min(Constants.FILMS_PORTION_SIZE, filteredFilms.length);
  }
}
