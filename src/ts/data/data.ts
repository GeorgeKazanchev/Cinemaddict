import { Filter, SortType, StatisticsPeriod } from '../model';
import films from './mock-films';

const initialState = {
  films,
  filter: Filter.All,
  sortType: SortType.Default,
  period: StatisticsPeriod.AllTime,
};

export default initialState;
