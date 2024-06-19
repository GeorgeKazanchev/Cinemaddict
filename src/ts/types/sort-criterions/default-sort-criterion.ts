import SortCriterionType from "../sort-criterion-type";
import SortCriterion from "./sort-criterion";

export default class DefaultSortCriterion extends SortCriterion {
    constructor() {
        super();
    }

    name: string = SortCriterionType.Default;
    modifier: string = `sort__button--default`;
}
