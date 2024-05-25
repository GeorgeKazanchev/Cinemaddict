import View from '../../../interfaces/view';

export default class FilmDetailsPosterImgView implements View {
    constructor(src: string, alt: string, width?: number, height?: number) {
        this.src = src;
        this.alt = alt;

        if (width !== undefined) {
            if (width <= 0) {
                throw new Error('Poster\'s width should be positive.');
            }
            this.width = width;
        }

        if (height !== undefined) {
            if (height <= 0) {
                throw new Error('Poster\'s height should be positive.');
            }
            this.height = height;
        }
    }

    src: string;
    alt: string;
    width?: number;
    height?: number;

    getTemplate(): Node {
        const template = this.getImageTemplate();
        return template;
    }

    getElement(): Node {
        const element = this.getImageTemplate();
        element.src = this.src;
        element.alt = this.alt;

        if (this.width !== undefined) {
            element.width = this.width;
        }

        if (this.height !== undefined) {
            element.height = this.height;
        }

        return element;
    }

    private getImageTemplate(): HTMLImageElement {
        const template = document.createElement('img');
        template.classList.add('film-details__poster-img');
        template.src = '';
        template.alt = '';
        return template;
    }
}