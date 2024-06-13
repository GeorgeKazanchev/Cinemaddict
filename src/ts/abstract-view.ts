export default abstract class AbstractView {
    constructor() {
        this.element = null;
    }

    element: Element | null;
    abstract template: string;

    abstract getElement(): Element;

    getMarkup(): string {
        return this.getElement().outerHTML;
    }

    getTemplate(): Element {
        const templateContainer = document.createElement('div');
        templateContainer.insertAdjacentHTML('afterbegin', this.template);

        const template = templateContainer.firstElementChild;

        if (template !== null) {
            return template;
        } else {
            throw new Error('Failed to create template!');
        }
    }
}
