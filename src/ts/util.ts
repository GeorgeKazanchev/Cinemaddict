export const render = (element: Element, containerElement: Element): void => {
  /* eslint-disable no-param-reassign */
  containerElement.innerHTML = '';
  containerElement.append(element);
  /* eslint-enable no-param-reassign */
};

export const renderHeader = (element: Element, mainElement: Element): void => {
  document.querySelector('.header')?.remove();
  mainElement.before(element);
};

export const renderFooter = (element: Element, mainElement: Element): void => {
  document.querySelector('.footer')?.remove();
  mainElement.after(element);
};

export const getElementFromTemplate = (template: string): Element => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template.trim();

  if (!wrapper.firstElementChild) {
    throw new Error('Failed to create an element from the template');
  }

  return wrapper.firstElementChild;
};

export const getTargetAsElement = (evt: Event): Element => {
  if (!evt.target || !(evt.target instanceof Element)) {
    throw new Error('Event Target is not an element');
  }

  return evt.target;
};
