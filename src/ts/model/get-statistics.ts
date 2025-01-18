import type Film from './types/film';

export const getWatchedFilmsSince = (startDate: Date, films: Film[]): Film[] => (
  films.filter(({ userDetails: { isWatched, watchingDate } }) => {
    if (isWatched && watchingDate) {
      return watchingDate >= startDate;
    }
    return false;
  })
);

export const getTotalDuration = (films: Film[]): number => (
  /* eslint-disable no-param-reassign */
  films.reduce((duration: number, film: Film) => {
    duration += film.info.durationMinutes;
    return duration;
  }, 0)
);

export const getFilmsCountByGenres = (films: Film[]): Map<string, number> => {
  const genresToFilmsCount = new Map<string, number>();
  films.forEach(({ info: { genres } }) => {
    genres.forEach((genre) => {
      const currentFilmsCount = genresToFilmsCount.get(genre) ?? 0;
      genresToFilmsCount.set(genre, currentFilmsCount + 1);
    });
  });
  return genresToFilmsCount;
};

export const getFavoriteGenre = (films: Film[]): string => {
  if (films.length === 0) {
    throw new Error('It is not possible to obtain a favorite genre from an empty array');
  }

  const genresToFilmsCount = getFilmsCountByGenres(films);

  if (genresToFilmsCount.size === 0) {
    throw new Error('There are no genres in the films');
  }

  let favoriteGenre = '';
  let maxFilmsCount = 0;

  genresToFilmsCount.forEach((filmsCount, genre) => {
    if (filmsCount > maxFilmsCount) {
      maxFilmsCount = filmsCount;
      favoriteGenre = genre;
    }
  });

  return favoriteGenre;
};
