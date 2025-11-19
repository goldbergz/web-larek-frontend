import { IProduct } from "../base/DataTypes";
import { Order } from "./OrderModel";

export type OrderResponse = {
	total: number;
	id: string;
};

export interface ProductApiClient {
  getProducts: () => Promise<IProduct[]>;
  getProduct: (id: string) => Promise<IProduct>;
  createOrder: (order: Order) => Promise<OrderResponse>;
}