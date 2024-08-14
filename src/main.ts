import ModelData from './ts/models-data/model-data';
import Application from './ts/application';
import { userData } from './mock-data';

const data = new ModelData(userData);
Application.showFilmsScreen(data);
