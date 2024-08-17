import FilmsList from './films-list';

export default class ErrorFilmsList extends FilmsList {
    constructor() {
        super(null);
    }

    title: string = 'Loading failed. Try again later!';
    isExtra: boolean = false;
    isEmpty: boolean = true;
    isTitleHidden: boolean = false;
}
