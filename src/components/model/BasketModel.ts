import { IBasketItem, IProduct } from "../../types/base/DataTypes";
import { IBasketModel, IBasketState } from "../../types/model/BasketModel";
import { Model } from "../base/Model";

export class BasketModel
  extends Model<IBasketState>
  implements IBasketModel
{
  constructor() {
    super({
      items: [],
      totalQuantity: 0,
      totalPrice: 0
    });
  }

  get items() {
    return this.state.items;
  }

  addProduct(product: IProduct): void {
    const exists = this.state.items.some(
      i => i.product.id === product.id
    );

    if (exists) return;

    const items = [...this.state.items, { product }];
    this.setState(this.calculate(items));
  }

  removeProduct(productId: string): void {
    const items = this.state.items.filter(
      i => i.product.id !== productId
    );

    this.setState(this.calculate(items));
  }

  getTotalPrice(): number {
    return this.state.totalPrice;
  }

  getItemCount(): number {
    return this.state.totalQuantity;
  }

  isEmpty(): boolean {
    return this.state.items.length === 0;
  }
  
  private calculate(items: IBasketItem[]): IBasketState {
    const totalPrice = items.reduce(
      (sum, i) => sum + i.product.price,
      0
    );

    return {
      items,
      totalPrice,
      totalQuantity: items.length,
    }
  }
}
