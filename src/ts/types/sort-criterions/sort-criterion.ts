export default abstract class SortCriterion {
    constructor() { }

    element: Element | null = null;
    abstract name: string;

    set active(isActive: boolean) {
        if (this.element) {
            const sortButton = this.element.querySelector('.sort__button');
            if (sortButton) {
                if (isActive) {
                    sortButton.classList.add('sort__button--active');
                } else {
                    sortButton.classList.remove('sort__button--active');
                }
            }
        }
    }

    createElement(): Element {
        const element = document.createElement('li');

        const innerElement = document.createElement('a');
        innerElement.href = '#';
        innerElement.classList.add('sort__button');
        innerElement.textContent = this.name;

        this.element = element;
        element.appendChild(innerElement);
        return element;
    }

    getElement(): Element {
        if (this.element) {
            return this.element;
        } else {
            throw new Error('The element has not been instantiated yet.');
        }
    }
}
