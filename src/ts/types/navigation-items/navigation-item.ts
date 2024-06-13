export default abstract class NavigationItem {
    constructor() { }

    abstract itemSelector: string;
    abstract activeItemClassname: string;

    setActiveItem(navigationItems: Element): void {
        const activeItem = navigationItems.querySelector(this.itemSelector);
        if (activeItem) {
            activeItem.classList.add(this.activeItemClassname);
        }
    }
}
