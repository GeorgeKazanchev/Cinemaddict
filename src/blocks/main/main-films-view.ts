import MainView from './main-view';
import FilmsSection from '../../ts/types/films-sections/films-section';
import UserData from '../../ts/types/user-data';
import SortCriterionType from '../../ts/types/sort-criterion-type';
import FiltrationCriterionType from '../../ts/types/filtration-criterion-type';

export default class MainFilmsView extends MainView {
    constructor(selectedFiltrationCriterion: FiltrationCriterionType, userData: UserData, filmsSection: FilmsSection,
        selectedSortCriterion: SortCriterionType) {

        super(userData);

        this.filmsSection = filmsSection;
        this.selectedFiltrationCriterion = selectedFiltrationCriterion;
        this.selectedSortCriterion = selectedSortCriterion;
    }

    filmsSection: FilmsSection;
    selectedFiltrationCriterion: FiltrationCriterionType;
    selectedSortCriterion: SortCriterionType;

    createElement(): Element {
        const element = this.getTemplate();
        return element;
    }
}
