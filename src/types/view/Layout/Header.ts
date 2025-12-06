import { IView } from "../../base/View";

export interface IHeader extends IView {
  updateBasketCount(count: number): void;
  onLogoClick?(callback: () => void): void;
  onBasketClick?(callback: () => void): void;
}
