import SortType from './ts/types/sort-type';
import FiltrationType from './ts/types/filtration-type';
import ModelData from './ts/models-data/model-data';
import Application from './ts/application';
import { userData, films } from './mock-data';
import { FILMS_CHUNK_SIZE } from './settings';

const isAuthorized = true;
const shownFilmsCount = FILMS_CHUNK_SIZE;
const filtrationSelected = FiltrationType.AllMovies;
const sortSelected = SortType.Default;

const data = new ModelData(films, shownFilmsCount, userData, isAuthorized, filtrationSelected, sortSelected);
Application.showFilmsScreen(data);
