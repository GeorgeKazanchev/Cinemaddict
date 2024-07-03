export default abstract class AbstractView {
    constructor() {
        this._element = null;
    }

    private _element: Element | null;

    public abstract get template(): string;

    public get element(): Element {
        if (!this._element) {
            this._element = this.createElement();
        }
        return this._element;
    }

    public abstract createElement(): Element;

    public getMarkup(): string {
        return this.element.outerHTML;
    }

    public getTemplate(): Element {
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
