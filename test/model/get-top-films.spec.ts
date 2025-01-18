import { it, describe, expect } from '@jest/globals';
import { getTopCommentedFilms, getTopRatedFilms } from '../../src/ts/model/get-top-films';
import { getEmptyFilm, getTestFilms } from '../get-test-films';

const films = getTestFilms();
const emptyFilm = getEmptyFilm();

describe('Get top rated films function', () => {
  it('should return an empty array if there are no films', () => {
    expect(getTopRatedFilms([])).toHaveLength(0);
  });

  it('should return an empty array if all the films have rating 0', () => {
    expect(getTopRatedFilms([emptyFilm])).toHaveLength(0);
  });

  it('should return 1 film if 2 films were passed (one of them has rating 0.0)', () => {
    expect(getTopRatedFilms([films[0], emptyFilm])).toHaveLength(1);
  });

  it('should return all the films have been passed', () => {
    expect(getTopRatedFilms(films)).toHaveLength(films.length);
  });

  it('should return 2 films if films count was set to 2', () => {
    const topRatedFilms = getTopRatedFilms(films, 2);
    expect(topRatedFilms).toHaveLength(2);
    expect(topRatedFilms[0].info.rating >= topRatedFilms[1].info.rating).toBe(true);
  });

  it('should return 0 films if films count was set to 0', () => {
    expect(getTopRatedFilms(films, 0)).toHaveLength(0);
  });

  it('should return all the films if films count exceeds the films array length', () => {
    expect(getTopRatedFilms(films, 1e+6)).toHaveLength(films.length);
  });
});

describe('Get top commented films function', () => {
  it('should return an empty array if there are no films', () => {
    expect(getTopCommentedFilms([])).toHaveLength(0);
  });

  it('should return an empty array if all the films have 0 comments', () => {
    expect(getTopCommentedFilms([emptyFilm])).toHaveLength(0);
  });

  it('should return 1 film if 2 films were passed (one of them has 0 comments)', () => {
    expect(getTopCommentedFilms([films[0], emptyFilm])).toHaveLength(1);
  });

  it('should return all the films have been passed', () => {
    expect(getTopCommentedFilms(films)).toHaveLength(films.length);
  });

  it('should return 2 films if films count was set to 2', () => {
    const topCommentedFilms = getTopCommentedFilms(films, 2);
    expect(topCommentedFilms).toHaveLength(2);
    expect(topCommentedFilms[0].commentsIds.length >= topCommentedFilms[1].commentsIds.length)
      .toBe(true);
  });

  it('should return 0 films if films count was set to 0', () => {
    expect(getTopCommentedFilms(films, 0)).toHaveLength(0);
  });

  it('should return all the films if films count exceeds the films array length', () => {
    expect(getTopCommentedFilms(films, 1e+6)).toHaveLength(films.length);
  });
});
