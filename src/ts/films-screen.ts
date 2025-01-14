import filmsFilteredScreen from './films-filtered-screen';
import filmsSortedScreen from './films-sorted-screen';
import popupScreen from './popup-screen';
import statisticsScreen from './statistics-screen';
import { changeScreen, getElementFromTemplate, getTargetAsElement } from './util';

const template = `
<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--all main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
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
        <h3 class="film-card__title">The Dance of Life</h3>
        <p class="film-card__rating">8.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="./img/debug-posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
        <a class="film-card__comments">5 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
      </article>

      <article class="film-card">
        <h3 class="film-card__title">Sagebrush Trail</h3>
        <p class="film-card__rating">3.2</p>
        <p class="film-card__info">
          <span class="film-card__year">1933</span>
          <span class="film-card__duration">54m</span>
          <span class="film-card__genre">Western</span>
        </p>
        <img src="./img/debug-posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
        <a class="film-card__comments">89 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
      </article>

      <article class="film-card">
        <h3 class="film-card__title">The Man with the Golden Arm</h3>
        <p class="film-card__rating">9.0</p>
        <p class="film-card__info">
          <span class="film-card__year">1955</span>
          <span class="film-card__duration">1h 59m</span>
          <span class="film-card__genre">Drama</span>
        </p>
        <img src="./img/debug-posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
        <a class="film-card__comments">18 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
      </article>

      <article class="film-card">
        <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
        <p class="film-card__rating">2.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1964</span>
          <span class="film-card__duration">1h 21m</span>
          <span class="film-card__genre">Comedy</span>
        </p>
        <img src="./img/debug-posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
        <a class="film-card__comments">465 comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
        </div>
      </article>

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
    </div>

    <button class="films-list__show-more">Show more</button>
  </section>
</section>`;

const element = getElementFromTemplate(template);

const allFilmsButtonElement = element.querySelector('.main-navigation__item--all');
allFilmsButtonElement?.addEventListener('click', (evt: Event) => {
  evt.preventDefault();
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
  changeScreen(filmsFilteredScreen);
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
