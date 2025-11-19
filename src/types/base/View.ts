export interface IView {
  render(): HTMLElement;
}

export interface IDataView<T> {
  render(data: Partial<T>): HTMLElement;
}

export interface IModal extends IView{
  closeButton: HTMLButtonElement;
  content?: HTMLElement;

  open(): void;
  close(): void;
  isOpen(): boolean;
}

export interface IList<T> extends IDataView<T[]> {
  setItems(items: T[]): void;
  getItems(): T[];
  onItemClick?(callback: (item: T, index: number) => void): void;
}
