import { IProduct } from '../base/DataTypes';
import { Order } from '../base/DataTypes';

export type OrderResponse = {
	total: number;
	id: string;
};

export interface IApiService {
	getProducts(): Promise<IProduct[]>;
	getProductById(id: string): Promise<IProduct>;
	createOrder(order: Order): Promise<OrderResponse>;
}

export interface CreateOrderRequest {
	payment: 'online' | 'upon receipt';
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}
