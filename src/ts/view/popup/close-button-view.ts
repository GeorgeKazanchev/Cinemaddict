import AbstractView from '../abstract-view';

export default class CloseButtonView extends AbstractView {
  public get template(): string {
    return `
      <div class="film-details__close">
        <button class="film-details__close-btn button" type="button">close</button>
      </div>`;
  }

  public bind(): void {
    this.element.addEventListener('click', (evt: Event) => {
      evt.preventDefault();
      this.onClose();
    });

    this.element.addEventListener('keydown', ((evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        this.onClose();
      }
    }) as EventListener);
  }

  public onClose(): void { }
}
