import { IProduct } from "../base/DataTypes";
import { IModel } from "../base/Model";

export interface IProductState {
  products: IProduct[];
  isLoading: boolean;
  error?: string;
}

export interface IProductModel extends IModel<IProductState> {
  products: IProduct[];
  isLoading: boolean;
  error?: string;

  setProducts(products: IProduct[]): void;
  setLoading(loading: boolean): void;
  setError(error: string): void;
  getProductById(id: string): IProduct | undefined;
}