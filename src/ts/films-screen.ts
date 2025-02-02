import mocksComments from './data/mock-comments';
import Filter from './model/enums/filter';
import SortType from './model/enums/sort-type';
import filterFilms from './model/filter-films';
import { getFilmsSummary } from './model/get-statistics';
import sortFilms from './model/sort-films';
import getPopup from './popup';
import getStatisticsScreen from './statistics-screen';
import { renderScreen } from './util';
import { FilmsView, SortPanelView } from './view/films';
import NavigationPanelView from './view/navigation-panel-view';
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
  const filteredFilms = filterFilms(films, filter);
  const shownFilms = sortFilms(filteredFilms, sortType);

  const navigationPanelView = new NavigationPanelView({
    filmsSummary,
    filter,
    isFilmsScreen: true,
  });

  const sortPanelView = new SortPanelView({ sortType });
  const filmsView = new FilmsView({ films: shownFilms });

  navigationPanelView.onFiltration = (selectedFilter: Filter) => {
    if (filter !== selectedFilter) {
      renderScreen(getFilmsScreen({ films, filter: selectedFilter }));
    }
  };

  navigationPanelView.onStatisticsOpen = () => {
    renderScreen(getStatisticsScreen({ films }));
  };

  sortPanelView.onSort = (selectedSortType: SortType) => {
    if (sortType !== selectedSortType) {
      renderScreen(getFilmsScreen({ films, filter, sortType: selectedSortType }));
    }
  };

  filmsView.onPopupOpen = (film: Film) => {
    document.querySelector('.film-details')?.remove();

    const comments = mocksComments.filter((comment) => film.commentsIds.includes(comment.id));
    const popupElement = getPopup({ film, comments });
    document.body.append(popupElement);

    const popupCloseButtonElement = popupElement.querySelector('.film-details__close-btn');
    if (popupCloseButtonElement instanceof HTMLElement) {
      setTimeout(() => popupCloseButtonElement.focus(), 0);
    }
  };

  const element = document.createElement('div');
  element.append(navigationPanelView.element);
  if (shownFilms.length > 0) {
    element.append(sortPanelView.element);
  }
  element.append(filmsView.element);

  return element;
};

export default getFilmsScreen;
