class HeaderView implements View {
    constructor(logo: Node, profile?: Node) {
        this.logo = logo;
        if (profile !== undefined) {
            this.profile = profile;
        }
    }

    logo: Node;
    profile?: Node;

    getTemplate(): Node {
        const template = document.createElement('header');
        template.classList.add('header');
        return template;
    }

    getElement(): Node {
        const element = this.getTemplate();
        element.appendChild(this.logo);
        if (this.profile !== undefined) {
            element.appendChild(this.profile);
        }
        return element;
    }
}