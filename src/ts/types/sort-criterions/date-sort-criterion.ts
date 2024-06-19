import SortCriterionType from '../sort-criterion-type';
import SortCriterion from './sort-criterion';

export default class DateSortCriterion extends SortCriterion {
    constructor() {
        super();
    }

    name: string = SortCriterionType.Date;
    modifier: string = `sort__button--date`;
}
