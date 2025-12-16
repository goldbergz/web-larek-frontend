import { IBasketItem, IProduct } from "../../base/DataTypes";
import { IDataView } from "../../base/View";


export interface IProductCardView extends IDataView<IProduct> {
  container: HTMLElement;
  product: IProduct;

  setProduct(product: IProduct): void;
}

export interface IBasketItemView extends IDataView<IBasketItem> {
  setBasketItem(basketItem: IBasketItem): void;
}
