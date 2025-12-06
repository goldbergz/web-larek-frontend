import { IBasketItem } from "../../base/DataTypes";
import { IModal } from "../../base/View";

export interface IBasketModal extends IModal {
  updateBasket(items: IBasketItem[]): void;
  onUpdateTotalSum?(callback: (sum: number) => void): void;
}