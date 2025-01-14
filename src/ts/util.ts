const mainElement = document.querySelector('.main');
if (!mainElement) {
  throw new Error('The ".main" element is absent from the page');
}

export const changeScreen = (element: Element): void => {
  mainElement.innerHTML = '';
  mainElement.append(element);
};

export const getElementFromTemplate = (template: string): HTMLElement => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const getTargetAsElement = (evt: Event): Element => {
  if (!evt.target || !(evt.target instanceof Element)) {
    throw new Error('Event Target is not an element');
  }

  return evt.target;
};
