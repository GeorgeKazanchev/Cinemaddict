import ModelData from './models-data/model-data';
import FilmsScreen from './presenters/films-screen';
import StatisticsScreen from './presenters/statistics-screen';

export default class Application {
    public static showFilmsScreen(data: ModelData) {
        const filmsScreen = new FilmsScreen(data);
        filmsScreen.render();
    }

    public static showStatistics(data: ModelData) {
        const statisticsScreen = new StatisticsScreen(data);
        statisticsScreen.render();
    }
}
