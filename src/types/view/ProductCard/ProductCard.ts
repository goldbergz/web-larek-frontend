import { IBasketItem, IProduct } from "../../base/DataTypes";
import { IDataView } from "../../base/View";


export interface IProductCardView extends IDataView<IProduct> {
  setProduct(product: IProduct): void;
}

export interface IBasketItemView extends IDataView<IBasketItem> {
  setBasketItem(basketItem: IBasketItem): void;
}

export interface IProductModalView extends IDataView<IProduct> {
  setProduct(product: IProduct): void;
  setInBasket(isInBasket: boolean): void;
}