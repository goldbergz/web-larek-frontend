import { IModal } from "../../types/base/View";
import { DataView } from "./View";

export abstract class Modal
  extends DataView<unknown>
  implements IModal
{
  closeButton: HTMLButtonElement;
  content?: HTMLElement;

  protected _isOpen = false;

  constructor(element: HTMLElement) {
    super(element);

    const closeBtn = element.querySelector<HTMLButtonElement>('.modal__close');
    if (!closeBtn) throw new Error('Modal close button not found');
    this.closeButton = closeBtn;

    this.closeButton.addEventListener('click', () => this.close());
    element.addEventListener('click', (e) => {
      if (e.target === element) this.close();
    });

    this.content = element.querySelector<HTMLElement>('.modal__content') ?? undefined;

  }

  open(): void {
    this.show();
    this._isOpen = true;
  }

  close(): void {
    this.hide();
    this._isOpen = false;
  }

  isOpen(): boolean {
    return this._isOpen;
  }

  update(data: Partial<unknown>): HTMLElement {
    return this.element;
  }

}