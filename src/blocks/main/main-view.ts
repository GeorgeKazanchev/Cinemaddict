import View from '../../interfaces/view';

export default abstract class MainView implements View {
    constructor(mainNavigation: Node) {
        this.mainNavigation = mainNavigation;
    }

    mainNavigation: Node;

    getTemplate(): Node {
        const template = document.createElement('main');
        template.classList.add('main');
        return template;
    }

    abstract getElement(): Node;
}