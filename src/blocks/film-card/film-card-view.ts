import AbstractView from '../../types/abstract-view';
import FilmCardData from '../../types/template-data/film-card-data';
import { compileFile } from 'pug';

export default class FilmCardView extends AbstractView {
    constructor(element: HTMLElement, data: FilmCardData) {
        super(element);
        this.filmData = data;
    }

    filmData: FilmCardData;

    getMarkup(): string {
        const renderFunction = compileFile('./film-card.pug');
        return renderFunction(this.filmData);
    }
}