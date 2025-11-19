import { IProduct } from "../../base/DataTypes";
import { IList } from "../../base/View";

export interface IProductListView extends IList<IProduct> {
  onProductClick?(callback: (product: IProduct) => void): void;
}