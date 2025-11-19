import { IView } from "../../base/View";

export interface IHeader extends IView {
  updateCartCount(count: number): void;
  setActivePage(page: string): void;
  onLogoClick?(callback: () => void): void;
  onCartClick?(callback: () => void): void;
  onNavigationClick?(callback: (page: string) => void): void;
}

export interface ICartCounter extends IView {
  updateCount(count: number): void;
  setVisible(isVisible: boolean): void;
  onClick?(callback: () => void): void;
}