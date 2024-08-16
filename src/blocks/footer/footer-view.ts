import AbstractView from '../../ts/abstract-view';

export default class FooterView extends AbstractView {
    constructor(filmsCount: number) {
        super();
        this.filmsCount = filmsCount;
    }

    filmsCount: number;

    public get template(): string {
        return `<footer class="footer">
                    <section class="footer__logo logo logo--smaller">Cinemaddict</section>
                    <section class="footer__statistics">
                        <p>${this.getFilmsStatistics()}</p>
                    </section>
                </footer>`;
    }

    public createElement(): Element {
        return this.getTemplate();
    }

    public updateTotalFilmsCount(totalFilmsCount: number): void {
        const filmsCountElement = this.element.querySelector('.footer__statistics > p');
        if (filmsCountElement instanceof Element) {
            this.filmsCount = totalFilmsCount;
            filmsCountElement.textContent = this.getFilmsStatistics();
        }
    }

    private getFilmsStatistics(): string {
        return this.filmsCount === 1
            ? `${this.filmsCount} movie inside`
            : `${this.filmsCount} movies inside`;
    }
}
