class FilmCardCommentsView implements View {
    constructor(commentsCount: number) {
        if (!Number.isInteger(commentsCount)) {
            throw new Error('Comments count should be integer.');
        }
        this.commentsCount = commentsCount;
    }

    commentsCount: number;

    getTemplate(): Node {
        const template = document.createElement('a');
        template.classList.add('film-card__comments');
        return template;
    }

    getElement(): Node {
        const element = document.createElement('a');
        element.classList.add('film-card__comments');
        element.textContent = this.commentsCount.toString() + ` ${this.commentsCount === 1 ? 'comment' : 'comments'}`;
        return element;
    }
}