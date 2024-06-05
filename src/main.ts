import FooterView from './blocks/footer/footer-view';
import HeaderView from './blocks/header/header-view';
import MainView from './blocks/main/main-view';
import FilmsSectionType from './types/films-section-type';
import SortCriterion from './types/sort-criterion';
import { userData, films } from './mock-data';

const isAuthorized = true;
const filmsSectionType = FilmsSectionType.MoviesWithExtra;
const activeSortCriterion = SortCriterion.Default;

const headerView = new HeaderView(isAuthorized, userData);
const mainView = new MainView(films, filmsSectionType, activeSortCriterion);
const footerView = new FooterView(films.length);

document.body.appendChild(headerView.getElement());
document.body.appendChild(mainView.getElement());
document.body.appendChild(footerView.getElement());
