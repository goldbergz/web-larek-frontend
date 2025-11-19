import { IComponent } from "../base/Model";

export interface IInteractiveElement extends IComponent {
  setDisabled(disabled: boolean): void;
  setLoading(loading: boolean): void;
  onClick?(callback: (event: MouseEvent) => void): void;
  onFocus?(callback: (event: FocusEvent) => void): void;
}

export interface IButton extends IInteractiveElement {
  setText(text: string): void;
  setIcon(iconUrl?: string): void;
}