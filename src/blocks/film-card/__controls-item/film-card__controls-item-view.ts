class FilmCardControlsItemView implements View {
    constructor(content: string, isActive: boolean, type: FilmCardControlsItemType) {
        this.content = content;
        this.isActive = isActive;
        this.type = type;
    }

    content: string;
    isActive: boolean;
    type: FilmCardControlsItemType;

    getTemplate(): Node {
        const template = document.createElement('button');
        template.type = 'button';
        this.setTemplateClasses(template);
        return template;
    }

    getElement(): Node {
        const element = document.createElement('button');
        element.type = 'button';
        this.setElementClasses(element);
        element.textContent = this.content;
        return element;
    }

    private setTemplateClasses(element: HTMLButtonElement): void {
        element.classList.add('button');
        element.classList.add('film-card__controls-item');
    }

    private setElementClasses(element: HTMLButtonElement): void {
        this.setTemplateClasses(element);

        if (this.isActive) {
            element.classList.add('film-card__controls-item--active');
        }

        switch (this.type) {
            case FilmCardControlsItemType.Watchlist: {
                element.classList.add('film-card__controls-item--add-to-watchlist');
                break;
            }
            case FilmCardControlsItemType.Watched: {
                element.classList.add('film-card__controls-item--mark-as-watched');
                break;
            }
            case FilmCardControlsItemType.Favorite: {
                element.classList.add('film-card__controls-item--favorite');
                break;
            }
        }
    }
}