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

export const loadElementLazy = (
  cachedElement: Element | null,
  containerElement: Element,
  selector: string,
  errorMessage: string,
): Element => {
  if (cachedElement) {
    return cachedElement;
  }

  const element = containerElement.querySelector(selector);
  if (!element) {
    throw new Error(errorMessage);
  }

  return element;
};

export const shakeElement = (element: Element, shakingClassname: string): void => {
  // Здесь используется хак, чтобы форма могла "трястить" более одного раза
  element.classList.remove(shakingClassname);
  element.scrollBy(0, 0);
  element.classList.add(shakingClassname);
};
