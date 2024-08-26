import ModelData from './ts/models-data/model-data';
import Application from './ts/application';
import { IS_DEBUG, userData } from './settings';
import { films as debugFilms } from './debug-data';

const films = IS_DEBUG ? debugFilms : null;
const data = new ModelData(userData, films);
Application.showFilmsScreen(data);
