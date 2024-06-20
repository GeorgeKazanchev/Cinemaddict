import SortCriterionType from './ts/types/sort-criterion-type';
import FiltrationCriterionType from './ts/types/filtration-criterion-type';
import FilledFilmsSection from './ts/types/films-sections/filled-films-section';
import FilmsScreen from './ts/presenters/films-screen';
import ModelData from './ts/models-data/model-data';
import { userData, films } from './mock-data';

const isAuthorized = true;
const filmsSection = new FilledFilmsSection(films);
const selectedFiltrationCriterion = FiltrationCriterionType.AllMovies;
const selectedSortCriterion = SortCriterionType.Default;

const data = new ModelData(films, filmsSection, userData, isAuthorized, selectedFiltrationCriterion, selectedSortCriterion);
const filmsScreen = new FilmsScreen(data);
filmsScreen.render();
