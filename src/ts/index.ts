import initialState from './data/data';
import FilmsScreen from './films-screen';
import Footer from './footer';
import Header from './header';
import { render, renderFooter, renderHeader } from './util';

import '../scss/style.scss';

const state = initialState;
const { films } = state;

const mainElement = document.querySelector('.main');
if (!mainElement) {
  throw new Error('The ".main" element is absent from the page');
}

const filmsScreen = new FilmsScreen({ ...state, mainElement });
const header = new Header({ films });
const footer = new Footer({ totalFilmsCount: films.length });

render(filmsScreen.element, mainElement);
renderHeader(header.element, mainElement);
renderFooter(footer.element, mainElement);
