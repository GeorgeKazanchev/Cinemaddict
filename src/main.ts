import SortCriterionType from './ts/types/sort-criterion-type';
import FiltrationCriterionType from './ts/types/filtration-criterion-type';
import FilmsScreen from './ts/presenters/films-screen';
import ModelData from './ts/models-data/model-data';
import { userData, films } from './mock-data';
import { FILMS_CHUNK_SIZE } from './settings';

const isAuthorized = true;
const shownFilmsCount = FILMS_CHUNK_SIZE;
const selectedFiltrationCriterion = FiltrationCriterionType.AllMovies;
const selectedSortCriterion = SortCriterionType.Default;

const data = new ModelData(films, shownFilmsCount, userData, isAuthorized, selectedFiltrationCriterion, selectedSortCriterion);
const filmsScreen = new FilmsScreen(data);
filmsScreen.render();
