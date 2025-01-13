const mainElement = document.querySelector('.main');
if (!mainElement) {
  throw new Error('The ".main" element is absent from the page');
}

const filmsScreenTemplate = document.querySelector('#films-screen');
const statisticsScreenTemplate = document.querySelector('#statistics-screen');

let currentScreen = 0;
const screenElements: Element[] = [];

type CallbackType = (template: HTMLTemplateElement) => unknown;

const getTemplateContent = (elem: HTMLTemplateElement): Node => elem.content.cloneNode(true);

const invokeIfTemplate = (element: Element | null, callback: CallbackType): unknown => {
  if (element instanceof HTMLTemplateElement) {
    return callback(element);
  }

  throw new Error('Element is not a template');
};

const isInArray = (array: unknown[], index: number): boolean => index >= 0 && index < array.length;

const renderScreen = (index: number): void => {
  if (!isInArray(screenElements, index)) {
    throw new RangeError('An incorrect screen\'s index has been obtained');
  }

  mainElement.innerHTML = '';
  mainElement.append(screenElements[index].cloneNode(true));
};

const changeScreenBy = (delta: number): void => {
  const newScreen = currentScreen + delta;
  if (isInArray(screenElements, newScreen)) {
    currentScreen = newScreen;
    renderScreen(currentScreen);
  }
};

const renderScreenChangeButtons = (): void => {
  const containerElement = document.createElement('div');
  const leftButtonElement = document.createElement('button');
  const rightButtonElement = document.createElement('button');

  containerElement.classList.add('arrows__wrap');
  leftButtonElement.classList.add('arrows__btn');
  rightButtonElement.classList.add('arrows__btn');

  leftButtonElement.textContent = '<-';
  rightButtonElement.textContent = '->';

  leftButtonElement.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    changeScreenBy(-1);
  });

  rightButtonElement.addEventListener('click', (evt: Event) => {
    evt.preventDefault();
    changeScreenBy(1);
  });

  containerElement.append(leftButtonElement, rightButtonElement);
  mainElement.after(containerElement);
};

const filmsScreenElement = invokeIfTemplate(filmsScreenTemplate, getTemplateContent);
const statisticsScreenElement = invokeIfTemplate(statisticsScreenTemplate, getTemplateContent);

screenElements.push(filmsScreenElement as Element);
screenElements.push(statisticsScreenElement as Element);

renderScreen(currentScreen);
renderScreenChangeButtons();

document.addEventListener('keydown', (evt: KeyboardEvent) => {
  switch (evt.key) {
    case 'ArrowLeft':
      changeScreenBy(-1);
      break;
    case 'ArrowRight':
      changeScreenBy(1);
      break;
    default:
      break;
  }
});
