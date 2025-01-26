import SortType from './model/enums/sort-type';
import { getElementFromTemplate } from './util';

const ACTIVE_CLASSNAME = 'sort__button--active';

type Props = {
  sortType?: SortType;
};

const getSortPanel = ({ sortType = SortType.Default }: Props): Element => {
  const content = `
    <ul class="sort">
      <li>
        <a href="#default" class="sort__button ${sortType === SortType.Default ? ACTIVE_CLASSNAME : ''}">
          Sort by default
        </a>
      </li>
      <li>
        <a href="#date" class="sort__button ${sortType === SortType.Date ? ACTIVE_CLASSNAME : ''}">
          Sort by date
        </a>
      </li>
      <li>
        <a href="#rating" class="sort__button ${sortType === SortType.Rating ? ACTIVE_CLASSNAME : ''}">
          Sort by rating
        </a>
      </li>
    </ul>`;

  const element = getElementFromTemplate(content);

  return element;
};

export default getSortPanel;
