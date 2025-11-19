export interface IComponent {
  render(): HTMLElement;
}

export interface IModel<T> {
  getState(): T;
  setState(newState: T): void;
  addChangeListener(callback: (state: T) => void): void;
  removeChangeListener(callback: (state: T) => void): void;
}

export interface IModal extends IComponent {
  open(): void;
  close(): void;
  isOpen(): boolean;
}

export interface IModalData {
  closeButton: HTMLButtonElement;
  content?: HTMLElement;
}

export interface IList<T> extends IComponent {
  setItems(items: T[]): void;
  getItems(): T[];
  onItemClick?(callback: (item: T, index: number) => void): void;
}