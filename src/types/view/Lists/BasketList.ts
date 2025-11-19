import { IBasketItem } from "../../base/DataTypes";
import { IList } from "../../base/View";

export interface IBasketListView extends IList<IBasketItem> {
  onUpdateQuantity?(callback: (productId: string, quantity: number) => void): void;
  onRemoveItem?(callback: (productId: string) => void): void;
}