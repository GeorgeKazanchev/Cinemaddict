import SortType from "../sort-type";
import SortCriterion from "./sort-criterion";

export default class DefaultSortCriterion extends SortCriterion {
    constructor() {
        super();
    }

    name: string = SortType.Default;
    modifier: string = `sort__button--default`;
}
