class FooterStatisticsView implements View {
    constructor(filmsCount: number) {
        this.filmsCount = filmsCount;
    }

    filmsCount: number;

    getTemplate(): Node {
        const template = document.createElement('section');
        template.classList.add('footer__statistics');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();

        const paragraph = document.createElement('p');
        paragraph.textContent = `${this.filmsCount} ${this.filmsCount === 1 ? 'movie' : 'movies'} inside`;
        element.appendChild(paragraph);

        return element;
    }
}