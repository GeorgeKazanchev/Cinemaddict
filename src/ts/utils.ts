import EmptyFilmsSection from './types/films-sections/empty-films-section';
import FilledFilmsSection from './types/films-sections/filled-films-section';
import FilmsSection from './types/films-sections/films-section';
import FiltrationCriterionType from './types/filtration-criterion-type';
import Movie from './types/movie';
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

export function getFilmsSection(films: Movie[] | null, allFilmsShown: boolean): FilmsSection {
    if (films && films.length > 0) {
        return new FilledFilmsSection(films, allFilmsShown);
    } else {
        return new EmptyFilmsSection();
    }
}
