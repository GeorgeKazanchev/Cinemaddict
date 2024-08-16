import ModelData from './ts/models-data/model-data';
import Application from './ts/application';
import { userData } from './settings';

const data = new ModelData(userData);
Application.showFilmsScreen(data);
