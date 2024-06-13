import AbstractView from '../../ts/abstract-view';
import Model from '../../ts/models/model';

export default class FooterView extends AbstractView {
    constructor(model: Model) {
        if (model.filmsCount < 0) {
            throw new RangeError('Number of the films can not be negative.');
        }

        super();
        this.model = model;
    }

    model: Model;
    template: string =
        `<footer class="footer">
            <section class="footer__logo logo logo--smaller">Cinemaddict</section>
            <section class="footer__statistics">
                <p></p>
            </section>
        </footer>`;

    createElement(): Element {
        const element = this.getTemplate();
        this.setFilmsStatistics(element);
        return element;
    }

    private setFilmsStatistics(element: Element): void {
        const statisticsElement = element.querySelector('.footer__statistics');
        if (statisticsElement) {
            const filmsCountElement = statisticsElement.querySelector('p');
            if (filmsCountElement) {
                filmsCountElement.textContent = this.model.filmsCount === 1
                    ? `${this.model.filmsCount} movie inside`
                    : `${this.model.filmsCount} movies inside`;
            }
        }
    }
}
