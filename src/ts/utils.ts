import FiltrationCriterionType from './types/filtration-criterion-type';
import SortCriterionType from './types/sort-criterion-type';

export function getMinDate(): Date {
    return new Date(-8640000000000000);
}

export function getFiltrationCriterionByElement(element: Element): FiltrationCriterionType {
    if (element.classList.contains('main-navigation__item--all')) {
        return FiltrationCriterionType.AllMovies;
    } else if (element.classList.contains('main-navigation__item--watchlist')) {
        return FiltrationCriterionType.Watchlist;
    } else if (element.classList.contains('main-navigation__item--history')) {
        return FiltrationCriterionType.History;
    } else if (element.classList.contains('main-navigation__item--favorites')) {
        return FiltrationCriterionType.Favorites;
    } else {
        throw new RangeError('Unsupported filtration criterion type.');
    }
}

export function getSortCriterionByElement(element: Element): SortCriterionType {
    if (element.textContent === SortCriterionType.Default) {
        return SortCriterionType.Default;
    } else if (element.textContent === SortCriterionType.Date) {
        return SortCriterionType.Date;
    } else if (element.textContent === SortCriterionType.Rating) {
        return SortCriterionType.Rating;
    } else {
        throw new RangeError('Unsupported sort criterion type.');
    }
}
