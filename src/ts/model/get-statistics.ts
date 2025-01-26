import StatisticsPeriod from './enums/statistics-period';
import getMinDate from './get-min-date';
import type Film from './types/film';
import type FilmsSummary from './types/films-summary';

export const getFilmsSummary = (films: Film[]): FilmsSummary => {
  const watchlistFilmsCount = films.filter(({ userDetails }) => userDetails.inWatchlist).length;
  const watchedFilmsCount = films.filter(({ userDetails }) => userDetails.isWatched).length;
  const favoriteFilmsCount = films.filter(({ userDetails }) => userDetails.isFavorite).length;

  return {
    watchlistFilmsCount,
    watchedFilmsCount,
    favoriteFilmsCount,
  };
};

export const getStatisticsStartDate = (period: StatisticsPeriod): Date => {
  const date = new Date();

  switch (period) {
    case StatisticsPeriod.AllTime:
      return getMinDate();
    case StatisticsPeriod.Today:
      date.setDate(date.getDate() - 1);
      return date;
    case StatisticsPeriod.Week:
      date.setDate(date.getDate() - 7);
      return date;
    case StatisticsPeriod.Month:
      date.setMonth(date.getMonth() - 1);
      return date;
    case StatisticsPeriod.Year:
      date.setFullYear(date.getFullYear() - 1);
      return date;
    default:
      throw new RangeError(`Statistics period isn't supported`);
  }
};

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
  const genresToFilmsCount = getFilmsCountByGenres(films);

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
