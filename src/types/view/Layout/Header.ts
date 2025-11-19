import { IComponent } from "../../base/Base";

export interface IHeader extends IComponent {
  updateCartCount(count: number): void;
  setActivePage(page: string): void;
  onLogoClick?(callback: () => void): void;
  onCartClick?(callback: () => void): void;
  onNavigationClick?(callback: (page: string) => void): void;
}

export interface ICartCounter extends IComponent {
  updateCount(count: number): void;
  setVisible(isVisible: boolean): void;
  onClick?(callback: () => void): void;
}

export interface ILogo extends IComponent {
  setImage(url: string): void;
}