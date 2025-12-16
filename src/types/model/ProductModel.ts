import { IProduct } from "../base/DataTypes";
import { IModel } from "../base/Model";

export interface IProductModel extends IModel<IProduct[]> {
  products: IProduct[];

  setProducts(products: IProduct[]): void;
  getProductById(id: string): IProduct | undefined;
}