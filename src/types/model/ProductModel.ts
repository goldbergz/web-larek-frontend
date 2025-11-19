import { IProduct } from "../base/DataTypes";
import { IModel } from "../base/Model";

export interface IProductModel extends IModel<IProduct[]> {
  loadProducts(): Promise<void>;
  getProductById(id: string): IProduct | undefined;
}