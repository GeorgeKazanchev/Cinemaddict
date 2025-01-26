import SortType from './enums/sort-type';
import type Film from './types/film';

const dateComparator = (a: Date, b: Date): number => {
  if (b > a) {
    return 1;
  }

  if (a > b) {
    return -1;
  }

  return 0;
};

const sortFilms = (films: Film[], sortType: SortType): Film[] => {
  switch (sortType) {
    //  Возвращаем копию исходного массива, чтобы метод работал предсказуемо и единообразно
    case SortType.Default:
      return [...films];
    case SortType.Date:
      return [...films].sort((a, b) => dateComparator(a.info.release.date, b.info.release.date));
    case SortType.Rating:
      return [...films].sort((a, b) => b.info.rating - a.info.rating);
    default:
      throw new RangeError(`Sort type isn't supported by the sorting method`);
  }
};

export default sortFilms;
