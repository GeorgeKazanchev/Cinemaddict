class FilmsListTitleView implements View {
    constructor(title: string, isHidden: boolean = false) {
        this.title = title;
        this.isHidden = isHidden;
    }

    title: string;
    isHidden: boolean;

    getTemplate(): Node {
        const template = document.createElement('h2');
        template.classList.add('films-list__title');
        return template;
    }

    getElement(): Node {
        const element = document.createElement('h2');
        element.className = 'films-list__title' + `${this.isHidden ? ' visually-hidden' : ''}`;
        element.textContent = this.title;
        return element;
    }
}