import { IBasketItem } from "../../base/DataTypes";
import { IModal } from "../../base/View";

export interface IBasketModal extends IModal {
  updateCart(items: IBasketItem[]): void;
  onUpdateQuantity?(callback: (productId: string, quantity: number) => void): void;
  onRemoveItem?(callback: (productId: string) => void): void;
}