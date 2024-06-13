import SortCriterionType from './ts/types/sort-criterion-type';
import MoviesWithExtraFilmsSection from './ts/types/films-sections/movies-with-extra-films-section';
import AllMoviesNavigationItem from './ts/types/navigation-items/all-movies-navigation-item';
import FilmsScreen from './ts/presenters/films-screen';
import ModelData from './ts/models-data/model-data';
import { userData, films } from './mock-data';

const isAuthorized = true;
const filmsSection = new MoviesWithExtraFilmsSection(films);
const selectedNavigationItem = new AllMoviesNavigationItem();
const selectedSortCriterion = SortCriterionType.Default;

const data = new ModelData(filmsSection, userData, isAuthorized, selectedNavigationItem, selectedSortCriterion);
const filmsScreen = new FilmsScreen(data);
filmsScreen.render();
