import { IProduct } from "../../base/DataTypes";
import { IList } from "../../base/Base";

export interface IProductListView extends IList<IProduct> {
  onProductClick?(callback: (product: IProduct) => void): void;
}