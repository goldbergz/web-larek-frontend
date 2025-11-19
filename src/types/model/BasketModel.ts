import { IBasketItem, IBasketState, IProduct } from "../base/DataTypes";
import { IModel } from "../base/Model";

export interface IBasketModel extends IModel<IBasketState> {
  items: IBasketItem[];
  
  addProduct(product: IProduct): void;
  removeProduct(productId: string): void;
  updateQuantity(productId: string, quantity: number): void;
  clear(): void;
  getItemCount(): number;
  getTotalPrice(): number;
  isEmpty(): boolean;
}