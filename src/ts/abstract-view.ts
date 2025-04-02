import { getElementFromTemplate } from './dom-util';

export default abstract class AbstractView {
  private _element: Element | null = null;

  public abstract get template(): string;

  public get element(): Element {
    return this.createElementLazy();
  }

  public render(): Element {
    return getElementFromTemplate(this.template);
  }

  public bind(): void {
    //  An empty method. May be overriden outside the module.
    //  Bind event handlers if required
  }

  protected createElementLazy(): Element {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind();

    return this._element;
  }
}
