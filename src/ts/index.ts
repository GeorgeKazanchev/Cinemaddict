import initialState from './data/data';
import FilmsScreen from './films-screen/films-screen';
import Footer from './footer/footer';
import Header from './header/header';
import { render, renderFooter, renderHeader } from './util';

import '../scss/style.scss';

const state = initialState;
const { films } = state;

const mainElement = document.querySelector('.main');
if (!mainElement) {
  throw new Error('The ".main" element is absent from the page');
}

const header = new Header({ films });
const footer = new Footer({ totalFilmsCount: films.length });
const filmsScreen = new FilmsScreen({ ...state, mainElement, header });

render(filmsScreen.element, mainElement);
renderHeader(header.element, mainElement);
renderFooter(footer.element, mainElement);
