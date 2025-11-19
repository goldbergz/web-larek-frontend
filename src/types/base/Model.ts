export interface IModel<T> {
  getState(): T;
  setState(newState: T): void;
  addChangeListener(callback: (state: T) => void): void;
  removeChangeListener(callback: (state: T) => void): void;
}