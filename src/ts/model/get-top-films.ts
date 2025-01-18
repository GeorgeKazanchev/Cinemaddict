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

export const getTopCommentedFilms = (films: Film[], count: number | null = null): Film[] => {
  let topCommentedFilms = [...films];

  topCommentedFilms.sort((a, b) => b.commentsIds.length - a.commentsIds.length);
  topCommentedFilms = topCommentedFilms.filter((film) => film.commentsIds.length > 0);

  const maxComments = topCommentedFilms[0]?.commentsIds.length;
  if (topCommentedFilms.every((film) => film.commentsIds.length === maxComments)) {
    shuffle(topCommentedFilms);
  }

  if (count !== null) {
    topCommentedFilms = topCommentedFilms.slice(0, count);
  }

  return topCommentedFilms;
};
