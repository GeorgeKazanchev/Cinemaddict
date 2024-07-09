import FilmsList from './films-list';

export default class EmptyFilmsList extends FilmsList {
    constructor() {
        super(null);
    }

    title: string = 'There are no movies in our database';
    isExtra: boolean = false;
    isEmpty: boolean = true;
    isTitleHidden: boolean = false;
}
