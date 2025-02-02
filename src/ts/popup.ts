import { getElementFromTemplate } from './util';
import {
  CloseButtonView, CommentsView, ControlsView, InfoView,
} from './view/popup';
import type Comment from './model/types/comment';
import type Film from './model/types/film';

type Props = {
  comments: Comment[];
  film: Film;
};

const getPopup = ({ film, comments }: Props): Element => {
  const closeButtonView = new CloseButtonView();
  const infoView = new InfoView({ filmInfo: film.info });
  const controlsView = new ControlsView({ userDetails: film.userDetails });
  const commentsView = new CommentsView({ comments });

  const template = `
    <section class="film-details">
      <form class="film-details__inner" action="#" method="get">
        <div class="film-details__top-container"></div>
        <div class="film-details__bottom-container"></div>
      </form>
    </section>`;

  const element = getElementFromTemplate(template);

  const topContainerElement = element.querySelector('.film-details__top-container');
  if (topContainerElement) {
    topContainerElement.append(closeButtonView.element);
    topContainerElement.append(infoView.element);
    topContainerElement.append(controlsView.element);
  }

  const bottomContainerElement = element.querySelector('.film-details__bottom-container');
  if (bottomContainerElement) {
    bottomContainerElement.append(commentsView.element);
  }

  closeButtonView.onClose = () => {
    element.remove();
  };

  element.addEventListener('keydown', ((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      element.remove();
    }
  }) as EventListener);

  return element;
};

export default getPopup;
