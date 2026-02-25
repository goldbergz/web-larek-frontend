import { IBasketItem, IProduct } from '../base/DataTypes';
import { IModel } from '../base/Model';

export interface IBasketState {
	items: IBasketItem[];
	totalQuantity: number;
	totalPrice: number;
}

export interface IBasketModel extends IModel<IBasketState> {
	items: IBasketItem[];

	addProduct(product: IProduct): void;
	removeProduct(productId: string): void;
	getTotalPrice(): number;
	getItemCount(): number;
	isEmpty(): boolean;
}
