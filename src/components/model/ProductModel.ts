import { IProduct } from '../../types/base/DataTypes';
import { IProductModel, IProductState } from '../../types/model/ProductModel';
import { Model } from '../base/Model';

export class ProductModel
  extends Model<IProductState>
  implements IProductModel {
  
  constructor() {
    super({
      products: [],
      isLoading: false,
      error: undefined
    });
  }

  get products() {
    return this.state.products;
  }

  get isLoading() {
    return this.state.isLoading;
  }

  get error() {
    return this.state.error;
  }

  setProducts(products: IProduct[]): void {
    this.setState({
      ...this.state,
      products,
      isLoading: false,
      error: undefined
    });
  }

  setLoading(loading: boolean): void {
    this.setState({
      ...this.state,
      isLoading: loading
    });
  }

  setError(error: string): void {
    this.setState({
      ...this.state,
      error,
      isLoading: false
    });
  }

  getProductById(id: string): IProduct | undefined {
    return this.state.products.find(p => p.id === id);
  }

}