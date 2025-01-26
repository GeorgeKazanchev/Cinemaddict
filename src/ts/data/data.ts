import Filter from '../model/enums/filter';
import SortType from '../model/enums/sort-type';
import StatisticsPeriod from '../model/enums/statistics-period';
import films from './mock-films';

const initialState = {
  films,
  filter: Filter.All,
  sortType: SortType.Default,
  period: StatisticsPeriod.AllTime,
};

export default initialState;
