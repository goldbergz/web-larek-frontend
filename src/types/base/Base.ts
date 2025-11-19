export interface IComponent {
  render(): HTMLElement;
}

export interface IModal extends IComponent {
  closeButton: HTMLButtonElement;
  content?: HTMLElement;

  open(): void;
  close(): void;
  isOpen(): boolean;
}

export interface IList<T> extends IComponent {
  setItems(items: T[]): void;
  getItems(): T[];
  onItemClick?(callback: (item: T, index: number) => void): void;
}

export type ValidationError = {
  field: string;
  message: string;
};

export interface IValidatable {
  validate(): ValidationError[];
}