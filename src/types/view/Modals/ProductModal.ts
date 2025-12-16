import { IProduct } from "../../base/DataTypes";
import { IDataView } from "../../base/View";

export interface IProductModalView extends IDataView<IProduct> {
  setProduct(product: IProduct): void;
  setInBasket(isInBasket: boolean): void;
  onAddToBasket(callback: (product: IProduct) => void): void;
  onRemoveFromBasket(callback: (product: IProduct) => void): void;
}