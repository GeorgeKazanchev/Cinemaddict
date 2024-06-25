import SortCriterionType from './ts/types/sort-criterion-type';
import FiltrationCriterionType from './ts/types/filtration-criterion-type';
import ModelData from './ts/models-data/model-data';
import Application from './ts/application';
import { userData, films } from './mock-data';
import { FILMS_CHUNK_SIZE } from './settings';

const isAuthorized = true;
const shownFilmsCount = FILMS_CHUNK_SIZE;
const selectedFiltrationCriterion = FiltrationCriterionType.AllMovies;
const selectedSortCriterion = SortCriterionType.Default;

const data = new ModelData(films, shownFilmsCount, userData, isAuthorized, selectedFiltrationCriterion, selectedSortCriterion);
Application.showFilmsScreen(data);
