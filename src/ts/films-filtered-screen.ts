import filmsScreen from './films-screen';
import filmsSortedScreen from './films-sorted-screen';
import popupScreen from './popup-screen';
import statisticsScreen from './statistics-screen';
import { changeScreen, getElementFromTemplate, getTargetAsElement } from './util';

const template = `
<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--all">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item main-navigation__item--active">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>

<ul class="sort">
  <li><a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>

<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
      <article class="film-card">
        <h3 class="film-card__title">Popeye the Sailor Meets Sindbad the Sailor</h3>
        <p class="film-card__rating">6.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1936</span>
          <span class="film-card__duration">16m</span>
          <span class="film-card__genre">Cartoon</span>
        </p>
        <img src="./img/debug-posters/popeye-meets-sinbad.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…</p>
        <a class="film-card__comments">0 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
        </div>
      </article>

      <article class="film-card">
        <h3 class="film-card__title">Sagebrush Trail</h3>
        <p class="film-card__rating">4.0</p>
        <p class="film-card__info">
          <span class="film-card__year">1937</span>
          <span class="film-card__duration">54m</span>
          <span class="film-card__genre">Western</span>
        </p>
        <img src="./img/debug-posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed vehicula lorem. Quisque eu dignissim sem, vitae sodales dolor. Duis act…</p>
        <a class="film-card__comments">51 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
        </div>
      </article>

      <article class="film-card">
        <h3 class="film-card__title">The Dance of Life</h3>
        <p class="film-card__rating">6.5</p>
        <p class="film-card__info">
          <span class="film-card__year">1940</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="./img/debug-posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Cumsan turpis nec elit congue, sit amet aliquet felis dapibus. Mauris auctor ornare tellus. Donec maximus quis nunc in sollicitudin. Quisqu…</p>
        <a class="film-card__comments">3 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
      </article>

      <article class="film-card">
        <h3 class="film-card__title">The Man with the Golden Arm</h3>
        <p class="film-card__rating">3.0</p>
        <p class="film-card__info">
          <span class="film-card__year">1925</span>
          <span class="film-card__duration">1h 59m</span>
          <span class="film-card__genre">Drama</span>
        </p>
        <img src="./img/debug-posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Curabitur lacinia, lacus a egestas auctor, massa enim commodo elit, neque mauris a nunc. Donec ipsum felis, ve facilisis tortor commodo etc…</p>
        <a class="film-card__comments">22 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
        </div>
      </article>
    </div>
  </section>
</section>`;

const element = getElementFromTemplate(template);

const allFilmsButtonElement = element.querySelector('.main-navigation__item--all');
allFilmsButtonElement?.addEventListener('click', (evt: Event) => {
  evt.preventDefault();
  changeScreen(filmsScreen);
});

const sortDefaultButtonElement = element.querySelector('.sort__button--default');
sortDefaultButtonElement?.addEventListener('click', (evt: Event) => {
  evt.preventDefault();
});

const statisticsButtonElement = element.querySelector('.main-navigation__additional');
statisticsButtonElement?.addEventListener('click', (evt: Event) => {
  evt.preventDefault();
  changeScreen(statisticsScreen);
});

element.addEventListener('click', (evt: Event) => {
  const target = getTargetAsElement(evt);
  const filterButtonElement = target.closest('.main-navigation__item:not(.main-navigation__item--all)');
  if (!filterButtonElement) {
    return;
  }

  evt.preventDefault();
});

element.addEventListener('click', (evt: Event) => {
  const target = getTargetAsElement(evt);
  const sortButtonElement = target.closest('.sort__button:not(.sort__button--default)');
  if (!sortButtonElement) {
    return;
  }

  evt.preventDefault();
  changeScreen(filmsSortedScreen);
});

element.addEventListener('click', (evt: Event) => {
  const target = getTargetAsElement(evt);
  const titleElement = target.closest('.film-card__title');
  const posterElement = target.closest('.film-card__poster');
  const commentsElement = target.closest('.film-card__comments');
  if (!titleElement && !posterElement && !commentsElement) {
    return;
  }

  evt.preventDefault();
  changeScreen(popupScreen);
});

export default element;
