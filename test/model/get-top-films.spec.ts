import { it, describe, expect } from '@jest/globals';
import { getMostCommentedFilms, getTopRatedFilms } from '../../src/ts/model/get-top-films';
import { getEmptyFilm, getFilms } from '../get-films';

const films = getFilms();
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
    const topFilms = getTopRatedFilms(films, 2);
    expect(topFilms).toHaveLength(2);
    expect(topFilms[0].info.rating).toBeGreaterThanOrEqual(topFilms[1].info.rating);
  });

  it('should return 0 films if films count was set to 0', () => {
    expect(getTopRatedFilms(films, 0)).toHaveLength(0);
  });

  it('should return all the films if films count exceeds the films array length', () => {
    expect(getTopRatedFilms(films, 1e+6)).toHaveLength(films.length);
  });
});

describe('Get most commented films function', () => {
  it('should return an empty array if there are no films', () => {
    expect(getMostCommentedFilms([])).toHaveLength(0);
  });

  it('should return an empty array if all the films have 0 comments', () => {
    expect(getMostCommentedFilms([emptyFilm])).toHaveLength(0);
  });

  it('should return 1 film if 2 films were passed (one of them has 0 comments)', () => {
    expect(getMostCommentedFilms([films[0], emptyFilm])).toHaveLength(1);
  });

  it('should return all the films have been passed', () => {
    expect(getMostCommentedFilms(films)).toHaveLength(films.length);
  });

  it('should correctly deals with the films with different numbers of comments', () => {
    const testFilms = [getEmptyFilm(), getEmptyFilm(), getEmptyFilm()];
    testFilms[0].commentsIds = ['Comment 1', 'Comment 2'];
    testFilms[1].commentsIds = ['Comment 3', 'Comment 4', 'Comment 5'];
    testFilms[2].commentsIds = ['Comment 6'];
    expect(getMostCommentedFilms(testFilms, 2)).toHaveLength(2);
  });

  it('should return 2 films if films count was set to 2', () => {
    const topFilms = getMostCommentedFilms(films, 2);
    expect(topFilms).toHaveLength(2);
    expect(topFilms[0].commentsIds.length).toBeGreaterThanOrEqual(topFilms[1].commentsIds.length);
  });

  it('should return 0 films if films count was set to 0', () => {
    expect(getMostCommentedFilms(films, 0)).toHaveLength(0);
  });

  it('should return all the films if films count exceeds the films array length', () => {
    expect(getMostCommentedFilms(films, 1e+6)).toHaveLength(films.length);
  });
});
