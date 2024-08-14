import SortType from '../sort-type';
import SortCriterion from './sort-criterion';

export default class RatingSortCriterion extends SortCriterion {
    constructor() {
        super();
    }

    name: string = SortType.Rating;
    modifier: string = `sort__button--rating`;
}
