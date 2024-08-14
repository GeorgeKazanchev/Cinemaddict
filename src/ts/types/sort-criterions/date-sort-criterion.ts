import SortType from '../sort-type';
import SortCriterion from './sort-criterion';

export default class DateSortCriterion extends SortCriterion {
    constructor() {
        super();
    }

    name: string = SortType.Date;
    modifier: string = `sort__button--date`;
}
