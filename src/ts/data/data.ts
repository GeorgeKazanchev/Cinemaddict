import {
  Comment, Constants, Film, Filter, SortType, StatisticsPeriod,
} from '../model';

export type State = {
  comments: Comment[];
  films: Film[];
  filter: Filter;
  period: StatisticsPeriod;
  shownFilmsCount: number;
  sortType: SortType;
};

const initialState: State = {
  comments: [],
  films: [],
  filter: Filter.All,
  period: StatisticsPeriod.AllTime,
  shownFilmsCount: Constants.FILMS_PORTION_SIZE,
  sortType: SortType.Default,
};

export default initialState;
