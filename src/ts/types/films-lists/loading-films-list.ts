import FilmsList from './films-list';

export default class LoadingFilmsList extends FilmsList {
    constructor() {
        super(null);
    }

    title: string = 'Loading...';
    isExtra: boolean = false;
    isEmpty: boolean = true;
    isTitleHidden: boolean = false;
}
