import initialState from './data/data';
import getFilmsScreen from './films-screen';
import getFooter from './footer';
import getHeader from './header';
import { renderFooter, renderHeader, renderScreen } from './util';

import '../scss/style.scss';

const { films } = initialState;

renderHeader(getHeader({ films }));
renderFooter(getFooter({ totalFilmsCount: films.length }));
renderScreen(getFilmsScreen({ ...initialState }));
