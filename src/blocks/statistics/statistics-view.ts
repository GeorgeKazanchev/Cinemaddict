import AbstractView from '../../ts/abstract-view';
import UserData from '../../ts/types/user-data';

export default class StatisticsView extends AbstractView {
    constructor(userData: UserData) {
        super();
        this.userData = userData;
    }

    userData: UserData;
    template: string =
        `<section class="statistic">
            <p class="statistic__rank">
                Your rank
                <img class="statistic__img" src="" alt="Avatar" width="35" height="35">
                <span class="statistic__rank-label"></span>
            </p>

            <form class="statistic__filters" action="https://echo.htmlacademy.ru/" method="get">
                <p class="statistic__filters-description">Show stats:</p>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
                <label for="statistic-all-time" class="statistic__filters-label">All time</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
                <label for="statistic-today" class="statistic__filters-label">Today</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
                <label for="statistic-week" class="statistic__filters-label">Week</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
                <label for="statistic-month" class="statistic__filters-label">Month</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
                <label for="statistic-year" class="statistic__filters-label">Year</label>
            </form>

            <ul class="statistic__text-list">
                <li class="statistic__text-item statistic__text-item--films-watched">
                    <h4 class="statistic__item-title">You watched</h4>
                    <p class="statistic__item-text"></p>
                </li>
                <li class="statistic__text-item statistic__text-item--total-duration">
                    <h4 class="statistic__item-title">Total duration</h4>
                    <p class="statistic__item-text"></p>
                </li>
                <li class="statistic__text-item statistic__text-item--top-genre">
                    <h4 class="statistic__item-title">Top genre</h4>
                    <p class="statistic__item-text"></p>
                </li>
            </ul>

            <div class="statistic__chart-wrap">
                <canvas class="statistic__chart" width="1000"></canvas>
            </div>
        </section>`;

    createElement(): Element {
        const element = this.getTemplate();
        this.setUserInfo(element);
        this.setStatisticsItems(element);
        return element;
    }

    private setUserInfo(element: Element): void {
        this.setAvatar(element);
        this.setRankLabel(element);
    }

    private setStatisticsItems(element: Element): void {
        this.setWatchedFilms(element);
        this.setTotalDuration(element);
        this.setTopGenre(element);
    }

    private setAvatar(element: Element): void {
        const avatarElement = element.querySelector('.statistic__img');
        if (avatarElement && avatarElement instanceof HTMLImageElement) {
            avatarElement.src = this.userData.avatar;
        }
    }

    private setRankLabel(element: Element): void {
        const rankLabelElement = element.querySelector('.statistic__rank-label');
        if (rankLabelElement) {
            rankLabelElement.textContent = this.userData.rank;
        }
    }

    private setWatchedFilms(element: Element): void {
        const watchedFilmsElement = element.querySelector('.statistic__text-item--films-watched');
        if (watchedFilmsElement) {
            const textElement = watchedFilmsElement.querySelector('.statistic__item-text');
            if (textElement) {
                const descriptionElement = this.createDescriptionElement();
                descriptionElement.textContent = this.userData.filmsWatched === 1
                    ? ' movie'
                    : ' movies';

                textElement.textContent = this.userData.filmsWatched.toFixed(0);
                textElement.appendChild(descriptionElement);
            }
        }
    }

    private setTotalDuration(element: Element): void {
        const totalDurationElement = element.querySelector('.statistic__text-item--total-duration');
        if (totalDurationElement) {
            const textElement = totalDurationElement.querySelector('.statistic__item-text');
            if (textElement) {
                const durationInMinutes = this.userData.totalDuration;
                const MINUTES_IN_HOUR = 60;

                if (durationInMinutes === 0) {
                    textElement.textContent = '0';
                } else if (durationInMinutes > 0 && durationInMinutes < MINUTES_IN_HOUR) {
                    const minutesWrapper = this.createDescriptionElement();
                    minutesWrapper.textContent = 'm';

                    textElement.innerHTML = `${durationInMinutes.toFixed(0)}`;
                    textElement.appendChild(minutesWrapper);
                } else if (durationInMinutes >= MINUTES_IN_HOUR) {
                    const hours = Math.floor(durationInMinutes / MINUTES_IN_HOUR);
                    const minutes = durationInMinutes - hours * MINUTES_IN_HOUR;

                    const hoursWrapper = this.createDescriptionElement();
                    const minutesWrapper = this.createDescriptionElement();
                    hoursWrapper.textContent = 'h';
                    minutesWrapper.textContent = 'm';

                    textElement.innerHTML = `${hours.toFixed(0)}`;
                    textElement.appendChild(hoursWrapper);
                    textElement.innerHTML += ` ${minutes.toFixed(0)}`;
                    textElement.appendChild(minutesWrapper);
                }
            }
        }
    }

    private setTopGenre(element: Element): void {
        const topGenreElement = element.querySelector('.statistic__text-item--top-genre');
        if (topGenreElement) {
            const textElement = topGenreElement.querySelector('.statistic__item-text');
            if (textElement) {
                textElement.textContent = this.userData.topGenre;
            }
        }
    }

    private createDescriptionElement(): Element {
        const element = document.createElement('span');
        element.classList.add('statistic__item-description');
        return element;
    }
}
