import SortCriterionType from '../sort-criterion-type';
import SortCriterion from './sort-criterion';

export default class RatingSortCriterion extends SortCriterion {
    constructor() {
        super();
    }

    name: string = SortCriterionType.Rating;
    modifier: string = `sort__button--rating`;
}
