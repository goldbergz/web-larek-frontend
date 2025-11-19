import { IBasketItem, IProduct } from "../../base/DataTypes";
import { IComponent } from "../../base/Base";

export interface IProductCardView extends IComponent {
  setProduct(product: IProduct): void;
  updateCartState(isInCart: boolean): void;
  onAddToCart?(callback: (product: IProduct) => void): void;
  onRemoveFromCart?(callback: (productId: string) => void): void;
  onClick?(callback: (product: IProduct) => void): void;
}

export interface IBasketItemView extends IComponent {
  setCartItem(cartItem: IBasketItem): void;
  onUpdateQuantity?(callback: (productId: string, quantity: number) => void): void;
  onRemove?(callback: (productId: string) => void): void;
}

export interface IProductModalView extends IComponent {
  setProduct(product: IProduct): void;
  setInCart(isInCart: boolean): void;
  onAddToCart?(callback: (product: IProduct) => void): void;
  onRemoveFromCart?(callback: (productId: string) => void): void;
}