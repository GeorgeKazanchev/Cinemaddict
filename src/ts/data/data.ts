import {
  Comment, Constants, Film, Filter, SortType, StatisticsPeriod,
} from '../model';
import mockComments from './mock-comments';

export type State = {
  comments: Comment[];
  films: Film[];
  filter: Filter;
  period: StatisticsPeriod;
  shownFilmsCount: number;
  sortType: SortType;
};

const initialState: State = {
  comments: mockComments,
  films: [],
  filter: Filter.All,
  period: StatisticsPeriod.AllTime,
  shownFilmsCount: Constants.FILMS_PORTION_SIZE,
  sortType: SortType.Default,
};

export default initialState;
