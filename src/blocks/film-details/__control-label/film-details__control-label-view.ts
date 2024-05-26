import View from '../../../interfaces/view';
import FilmType from '../../../enums/film-type';

export default class FilmDetailsControlLabelView implements View {
    constructor(content: string, type: FilmType, targetId: string) {
        this.content = content;
        this.type = type;
        this.targetId = targetId;
    }

    content: string;
    type: FilmType;
    targetId: string;

    getTemplate(): Node {
        const template = this.getLabelTemplate();
        return template;
    }

    getElement(): Node {
        const element = this.getLabelTemplate();
        element.setAttribute('for', this.targetId);
        element.textContent = this.content;

        switch (this.type) {
            case FilmType.Watchlist: {
                element.classList.add('film-details__control-label--watchlist');
                break;
            }
            case FilmType.Watched: {
                element.classList.add('film-details__control-label--watched');
                break;
            }
            case FilmType.Favorite: {
                element.classList.add('film-details__control-label--favorite');
                break;
            }
        }

        return element;
    }

    private getLabelTemplate(): HTMLLabelElement {
        const template = document.createElement('label');
        template.classList.add('film-details__control-label');
        return template;
    }
}