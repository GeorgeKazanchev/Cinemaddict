import FiltrationType from './types/filtration-type';
import SortType from './types/sort-type';

export function getMinDate(): Date {
    return new Date(-8640000000000000);
}

export function getRandomString(length: number): string {
    const CHARACTERS = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let str = '';
    for (let i = 0; i < length; ++i) {
        const index = Math.floor(Math.random() * CHARACTERS.length);
        str += CHARACTERS.substring(index, index + 1);
    }
    return str;
}

export function getFiltrationCriterionByElement(element: Element): FiltrationType {
    if (element.classList.contains('main-navigation__item--all')) {
        return FiltrationType.AllMovies;
    } else if (element.classList.contains('main-navigation__item--watchlist')) {
        return FiltrationType.Watchlist;
    } else if (element.classList.contains('main-navigation__item--history')) {
        return FiltrationType.History;
    } else if (element.classList.contains('main-navigation__item--favorites')) {
        return FiltrationType.Favorites;
    } else {
        throw new RangeError('Unsupported filtration criterion type.');
    }
}

export function getSortCriterionByElement(element: Element): SortType {
    if (element.textContent === SortType.Default) {
        return SortType.Default;
    } else if (element.textContent === SortType.Date) {
        return SortType.Date;
    } else if (element.textContent === SortType.Rating) {
        return SortType.Rating;
    } else {
        throw new RangeError('Unsupported sort criterion type.');
    }
}
