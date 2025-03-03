import { State } from './data/data';
import FilmsScreen from './films-screen/films-screen';
import Model from './model/model';
import StatisticsScreen from './statistics-screen/statistics-screen';
import { render } from './util';

export default class Application {
  public static showFilmsScreen(state: State) {
    const model = new Model(state);
    const filmsScreen = new FilmsScreen(model);
    render(filmsScreen.element, Application._getAppContainer());
  }

  public static showStatistics(state: State) {
    const model = new Model(state);
    const statisticsScreen = new StatisticsScreen(model);
    render(statisticsScreen.element, Application._getAppContainer());
  }

  private static _getAppContainer(): Element {
    const appElement = document.querySelector('.app');
    if (!appElement) {
      throw new Error('The ".app" element is absent from the page');
    }
    return appElement;
  }
}
