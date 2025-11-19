export interface IView {
  render(): HTMLElement;
}

export interface IListView<T> extends IView {
  setItems(items: T[]): void;
  onItemClick?(callback: (item: T, index: number) => void): void;
}