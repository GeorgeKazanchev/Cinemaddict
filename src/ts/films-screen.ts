import getFilmCard from './film-card';
import Filter from './model/enums/filter';
import SortType from './model/enums/sort-type';
import filterFilms from './model/filter-films';
import { getFilmsSummary } from './model/get-statistics';
import sortFilms from './model/sort-films';
import getNavigationPanel from './navigation-panel';
import getSortPanel from './sort-panel';
import getStatisticsScreen from './statistics-screen';
import { getElementFromTemplate, renderScreen } from './util';
import type Film from './model/types/film';

type Props = {
  films: Film[];
  filter?: Filter;
  sortType?: SortType;
};

const getFilmsScreen = ({
  films,
  filter = Filter.All,
  sortType = SortType.Default,
}: Props): Element => {
  const filmsSummary = getFilmsSummary(films);

  const sortPanel = getSortPanel({ sortType }).outerHTML;
  const navigationPanel = getNavigationPanel({
    filmsSummary,
    filter,
    isFilmsScreen: true,
  }).outerHTML;

  const filteredFilms = filterFilms(films, filter);
  const shownFilms = sortFilms(filteredFilms, sortType);
  const filmCards = shownFilms.map((film) => getFilmCard({ film }));

  const areFilmsShown = shownFilms.length > 0;
  const title = shownFilms.length > 0 ? 'All movies. Upcoming' : 'There are no movies in our database';

  const content = `
    <div>
      ${navigationPanel}
      ${areFilmsShown ? sortPanel : ''}
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title ${areFilmsShown ? 'visually-hidden' : ''}">${title}</h2>
          ${areFilmsShown ? '<div class="films-list__container"></div>' : ''}
          <button class="films-list__show-more">Show more</button>
        </section>
      </section>
    </div>`;

  const element = getElementFromTemplate(content);

  element.querySelector('.films-list__container')?.append(...filmCards);

  //  Обработчики кликов по кнопкам фильтрации
  element.querySelector('.main-navigation__item[href="#all"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    if (filter !== Filter.All) {
      renderScreen(getFilmsScreen({ films }));
    }
  });

  element.querySelector('.main-navigation__item[href="#watchlist"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    if (filter !== Filter.Watchlist) {
      renderScreen(getFilmsScreen({ films, filter: Filter.Watchlist }));
    }
  });

  element.querySelector('.main-navigation__item[href="#history"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    if (filter !== Filter.Watched) {
      renderScreen(getFilmsScreen({ films, filter: Filter.Watched }));
    }
  });

  element.querySelector('.main-navigation__item[href="#favorites"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    if (filter !== Filter.Favorite) {
      renderScreen(getFilmsScreen({ films, filter: Filter.Favorite }));
    }
  });

  //  Обработчики кликов по кнопкам сортировки
  element.querySelector('.sort__button[href="#default"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    if (sortType !== SortType.Default) {
      renderScreen(getFilmsScreen({ films, filter }));
    }
  });

  element.querySelector('.sort__button[href="#date"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    if (sortType !== SortType.Date) {
      renderScreen(getFilmsScreen({ films, filter, sortType: SortType.Date }));
    }
  });

  element.querySelector('.sort__button[href="#rating"]')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    if (sortType !== SortType.Rating) {
      renderScreen(getFilmsScreen({ films, filter, sortType: SortType.Rating }));
    }
  });

  //  Обработчик клика по кнопке перехода на экран "Статистика"
  element.querySelector('.main-navigation__additional')?.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    renderScreen(getStatisticsScreen({ films }));
  });

  return element;
};

export default getFilmsScreen;
