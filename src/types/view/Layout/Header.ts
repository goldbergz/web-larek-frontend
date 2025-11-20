import { IView } from "../../base/View";

export interface IHeader extends IView {
  updateBasketCount(count: number): void;
  setActivePage(page: string): void;
  onLogoClick?(callback: () => void): void;
  onBasketClick?(callback: () => void): void;
  onNavigationClick?(callback: (page: string) => void): void;
}

export interface IBasketCounter extends IView {
  updateCount(count: number): void;
  setVisible(isVisible: boolean): void;
  onClick?(callback: () => void): void;
}