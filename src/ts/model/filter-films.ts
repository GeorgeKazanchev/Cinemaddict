import Filter from './enums/filter';
import type Film from './types/film';

const filterFilms = (films: Film[], filter: Filter): Film[] => {
  switch (filter) {
    case Filter.All:
      return films;
    case Filter.Watchlist:
      return films.filter(({ userDetails }) => userDetails.inWatchlist);
    case Filter.Watched:
      return films.filter(({ userDetails }) => userDetails.isWatched);
    case Filter.Favorite:
      return films.filter(({ userDetails }) => userDetails.isFavorite);
    default:
      throw new RangeError(`Filter isn't supported by the filtration method`);
  }
};

export default filterFilms;
