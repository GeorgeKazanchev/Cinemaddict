export default abstract class SortCriterion {
    constructor() { }

    element: Element | null = null;
    abstract name: string;
    abstract modifier: string;

    public set active(isActive: boolean) {
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

    public createElement(): Element {
        const element = document.createElement('li');

        const innerElement = document.createElement('a');
        innerElement.href = '#';
        innerElement.classList.add('sort__button');
        innerElement.classList.add(this.modifier);
        innerElement.textContent = this.name;

        this.element = element;
        element.appendChild(innerElement);
        return element;
    }

    public getElement(): Element {
        if (this.element) {
            return this.element;
        } else {
            throw new Error('The element has not been instantiated yet.');
        }
    }
}
