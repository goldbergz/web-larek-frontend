export interface IComponent {
  element: HTMLElement;

  show(): void;
  hide(): void;
  setText(text: string): void;
  setDisabled(disabled: boolean): void;
  toggleClass(className: string, state: boolean): void;
}

export interface IView extends IComponent {
  render(): HTMLElement;
}

export interface IDataView<T> extends IView {
  update(data: Partial<T>): HTMLElement;
}

export interface IModal<T = unknown> extends IDataView<T> {
  closeButton: HTMLButtonElement;
  content?: HTMLElement;

  open(): void;
  close(): void;
  isOpen(): boolean;
}

export interface IList<T> extends IDataView<T[]> {
  items: T[];
  
  setItems(items: T[]): void;
  getItems(): T[];
  onItemClick?(callback: (item: T, index: number) => void): void;
}
