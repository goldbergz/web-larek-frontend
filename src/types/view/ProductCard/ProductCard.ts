import { IBasketItem, IProduct } from "../../base/DataTypes";
import { IView } from "../../base/View";

export interface IProductCardView extends IView {
  setProduct(product: IProduct): void;
  updateCartState(isInCart: boolean): void;
  onAddToCart?(callback: (product: IProduct) => void): void;
  onRemoveFromCart?(callback: (productId: string) => void): void;
  onClick?(callback: (product: IProduct) => void): void;
}

export interface IBasketItemView extends IView {
  setCartItem(cartItem: IBasketItem): void;
  onUpdateQuantity?(callback: (productId: string, quantity: number) => void): void;
  onRemove?(callback: (productId: string) => void): void;
}

export interface IProductModalView extends IView {
  setProduct(product: IProduct): void;
  setInCart(isInCart: boolean): void;
  onAddToCart?(callback: (product: IProduct) => void): void;
  onRemoveFromCart?(callback: (productId: string) => void): void;
}