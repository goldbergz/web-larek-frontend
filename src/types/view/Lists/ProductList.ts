import { IProduct } from "../../base/DataTypes";
import { IList } from "../../base/Model";

export interface IProductListView extends IList<IProduct> {
  onAddToCart?(callback: (product: IProduct) => void): void;
  onProductClick?(callback: (product: IProduct) => void): void;
}