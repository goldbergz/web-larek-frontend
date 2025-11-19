import { IProduct } from "../../base/DataTypes";
import { IModal } from "../../base/Model";

export interface IProductModal extends IModal {
  setProduct(product: IProduct): void;
  onAddToCart?(callback: (product: IProduct) => void): void;
  onRemoveFromCart?(callback: (productId: string) => void): void;
}