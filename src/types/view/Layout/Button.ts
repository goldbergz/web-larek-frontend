import { IView } from "../../base/View";

export interface IInteractiveElement extends IView {
  setDisabled(disabled: boolean): void;
  onClick?(callback: (event: MouseEvent) => void): void;
}

export interface IButton extends IInteractiveElement {
  setText(text: string): void;
}