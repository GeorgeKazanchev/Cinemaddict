import View from '../../../interfaces/view';

export default class StatisticsFiltersInputView implements View {
    constructor(name: string, id: string, value: string, type: string = 'radio',
        isChecked: boolean = false, isInput: boolean = true) {
        this.name = name;
        this.id = id;
        this.value = value;
        this.type = type;
        this.isChecked = isChecked;
        this.isHidden = isInput;
    }

    name: string;
    id: string;
    value: string;
    type: string;
    isChecked: boolean;
    isHidden: boolean;

    getTemplate(): Node {
        const template = document.createElement('input');
        template.className = 'statistic__filters-input' + `${this.isHidden ? ' visually-hidden' : ''}`;
        template.type = this.type;
        return template;
    }

    getElement(): Node {
        const element = document.createElement('input');
        element.className = 'statistic__filters-input' + `${this.isHidden ? ' visually-hidden' : ''}`;
        element.type = this.type;
        element.name = this.name;
        element.id = this.id;
        element.value = this.value;
        element.checked = this.isChecked;
        return element;
    }
}