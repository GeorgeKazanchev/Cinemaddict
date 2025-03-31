import shuffle from './shuffle';
import type Film from './types/film';

export const getTopRatedFilms = (films: Film[], count: number | null = null): Film[] => {
  let topRatedFilms = [...films];

  topRatedFilms.sort((a, b) => b.info.rating - a.info.rating);
  topRatedFilms = topRatedFilms.filter(({ info: { rating } }) => rating > 0.0);

  const topRating = topRatedFilms[0]?.info.rating;
  if (topRatedFilms.every(({ info: { rating } }) => rating === topRating)) {
    shuffle(topRatedFilms);
  }

  if (count !== null) {
    topRatedFilms = topRatedFilms.slice(0, count);
  }

  return topRatedFilms;
};

export const getMostCommentedFilms = (films: Film[], count: number | null = null): Film[] => {
  let mostCommentedFilms = [...films];

  mostCommentedFilms.sort((a, b) => b.commentsIds.length - a.commentsIds.length);
  mostCommentedFilms = mostCommentedFilms.filter((film) => film.commentsIds.length > 0);

  const maxCommentsCount = mostCommentedFilms[0]?.commentsIds.length;
  if (mostCommentedFilms.every((film) => film.commentsIds.length === maxCommentsCount)) {
    shuffle(mostCommentedFilms);
  }

  if (count !== null) {
    mostCommentedFilms = mostCommentedFilms.slice(0, count);
  }

  return mostCommentedFilms;
};
