import HeaderView from './blocks/header/header-view';
import FooterView from './blocks/footer/footer-view';
import MainFilmsView from './blocks/main/main-films-view';
import SortCriterionType from './types/sort-criterion-type';
import MoviesWithExtraFilmsSection from './types/films-sections/movies-with-extra-films-section';
import AllMoviesNavigationItem from './types/navigation-items/all-movies-navigation-item';
import { userData, films } from './mock-data';

const isAuthorized = true;
const filmsSection = new MoviesWithExtraFilmsSection(films);
const selectedNavigationItem = new AllMoviesNavigationItem();
const selectedSortCriterion = SortCriterionType.Default;

const headerView = new HeaderView(isAuthorized, userData);
const mainView = new MainFilmsView(selectedNavigationItem, userData, filmsSection, selectedSortCriterion);
const footerView = new FooterView(films.length);

document.body.appendChild(headerView.getElement());
document.body.appendChild(mainView.getElement());
document.body.appendChild(footerView.getElement());
