export const render = (element: Element, containerElement: Element): void => {
  // eslint-disable-next-line no-param-reassign
  containerElement.innerHTML = '';
  containerElement.append(element);
};

export const getElementFromTemplate = (template: string): Element => {
  const wrapperElement = document.createElement('div');
  wrapperElement.innerHTML = template.trim();

  if (!wrapperElement.firstElementChild) {
    throw new Error('Failed to create an element from the template');
  }

  return wrapperElement.firstElementChild;
};

export const getTargetAsElement = (evt: Event): Element => {
  if (!evt.target || !(evt.target instanceof Element)) {
    throw new Error('Event Target is not an element');
  }

  return evt.target;
};
