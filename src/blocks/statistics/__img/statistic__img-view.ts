class StatisticsImgView implements View {
    constructor(src: string, alt: string, size: number) {
        if (size <= 0) {
            throw new Error('Image\'s size should be positive.');
        }

        this.src = src;
        this.alt = alt;
        this.size = size;
    }

    src: string;
    alt: string;
    size: number;

    getTemplate(): Node {
        const template = document.createElement('img');
        template.classList.add('statistic__img');
        template.src = '';
        template.alt = '';
        return template;
    }

    getElement(): Node {
        const element = document.createElement('img');
        element.classList.add('statistic__img');
        element.src = this.src;
        element.alt = this.alt;
        element.width = this.size;
        element.height = this.size;
        return element;
    }
}