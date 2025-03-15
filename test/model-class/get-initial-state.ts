import { State } from '../../src/ts/data/data';
import {
  Constants, Filter, SortType, StatisticsPeriod,
} from '../../src/ts/model';
import { getComments } from '../get-comments';
import { getFilms } from '../get-films';

const films = getFilms();
const comments = getComments();

const getInitialState = (): State => ({
  comments,
  films,
  filter: Filter.All,
  period: StatisticsPeriod.AllTime,
  shownFilmsCount: Math.min(Constants.FILMS_PORTION_SIZE, films.length),
  sortType: SortType.Default,
});

export default getInitialState;
