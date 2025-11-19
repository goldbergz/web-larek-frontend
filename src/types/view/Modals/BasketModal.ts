import { IBasketItem } from "../../base/DataTypes";
import { IModal } from "../../base/Model";

export interface IBaskettModal extends IModal {
  updateCart(items: IBasketItem[]): void;
  onUpdateQuantity?(callback: (productId: string, quantity: number) => void): void;
  onRemoveItem?(callback: (productId: string) => void): void;
}