import AbstractView from '../../ts/abstract-view';

export default class FooterView extends AbstractView {
    constructor(filmsCount: number) {
        super();
        this.filmsCount = filmsCount;
    }

    filmsCount: number;
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
                filmsCountElement.textContent = this.filmsCount === 1
                    ? `${this.filmsCount} movie inside`
                    : `${this.filmsCount} movies inside`;
            }
        }
    }
}
