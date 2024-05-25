import View from '../../../interfaces/view';

export default class FilmDetailsCommentEmojiView implements View {
    constructor(src: string, alt: string, size: number) {
        if (size <= 0) {
            throw new Error('Emoji\'s size should be positive.');
        }

        this.src = src;
        this.alt = alt;
        this.size = size;
    }

    src: string;
    alt: string;
    size: number;

    getTemplate(): Node {
        const template = document.createElement('span');
        template.classList.add('film-details__comment-emoji');
        template.appendChild(this.getImageTemplate());
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        const image = this.getImageTemplate();
        image.src = this.src;
        image.alt = this.alt;
        element.appendChild(image);
        return element;
    }

    private getImageTemplate() {
        const image = document.createElement('img');
        image.src = '';
        image.alt = '';
        image.width = this.size;
        image.height = this.size;
        return image;
    }
}