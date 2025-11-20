import { IProduct } from "../base/DataTypes";
import { Order } from "../base/DataTypes";

export type OrderResponse = {
	total: number;
	id: string;
};

export interface ProductApiClient {
  getProducts: () => Promise<IProduct[]>;
  getProduct: (id: string) => Promise<IProduct>;
  createOrder: (order: Order) => Promise<OrderResponse>;
}