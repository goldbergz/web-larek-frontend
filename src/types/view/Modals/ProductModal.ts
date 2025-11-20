import { IProduct } from "../../base/DataTypes";
import { IModal } from "../../base/View";

export interface IProductModal extends IModal {
  setProduct(product: IProduct): void;
  onAddToBasket?(callback: (product: IProduct) => void): void;
  onRemoveFromBasket?(callback: (productId: string) => void): void;
}