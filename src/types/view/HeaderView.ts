import { IView } from '../base/View';

export interface IHeaderView extends IView {
setCounter(count: number): void;
  onBasketClick(callback: () => void): void;
}