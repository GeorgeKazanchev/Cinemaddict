import ModelData from './models-data/model-data';
import FilmsScreen from './presenters/films-screen';
import StatisticsScreen from './presenters/statistics-screen';
import { getRandomString } from './utils';

export default class Application {
    private static _authorizationString: string = getRandomString(12);

    public static get authorizationString(): string {
        return this._authorizationString;
    }

    public static showFilmsScreen(data: ModelData) {
        const filmsScreen = new FilmsScreen(data);
        filmsScreen.render();
    }

    public static showStatistics(data: ModelData) {
        const statisticsScreen = new StatisticsScreen(data);
        statisticsScreen.render();
    }
}
