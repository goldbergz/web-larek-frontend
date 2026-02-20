import { IComponent } from "../../types/base/View";

export class Component implements IComponent {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  show(): void {
    this.element.style.display = 'block';
  }

  hide(): void {
    this.element.style.display = 'none';
  }

  setText(text: string): void {
    this.element.textContent = text;
  }

  setDisabled(disabled: boolean): void {
    (this.element as HTMLButtonElement | HTMLInputElement).disabled = disabled;
  }

  toggleClass(className: string, state: boolean): void {
    if (state) this.element.classList.add(className);
    else this.element.classList.remove(className);
  }
}