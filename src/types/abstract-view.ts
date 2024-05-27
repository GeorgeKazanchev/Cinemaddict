export default abstract class AbstractView {
    constructor(element: HTMLElement) {
        this.element = element;
    }

    element: HTMLElement;

    abstract getMarkup(): string;
}