import { ApiListResponse } from '../../types/base/Api';
import { IProduct, Order } from '../../types/base/DataTypes';
import {
	CreateOrderRequest,
	IApiService,
	OrderResponse,
} from '../../types/model/ProductApi';
import { Api } from './api';

export class ApiService extends Api implements IApiService {
	async getProducts(): Promise<IProduct[]> {
		const res = await this.get<ApiListResponse<IProduct>>('/product');
		return res.items;
	}

	async getProductById(id: string): Promise<IProduct> {
		return this.get<IProduct>(`/product/${id}`);
	}

	async createOrder(order: Order): Promise<OrderResponse> {
		const payload: CreateOrderRequest = {
			payment: order.paymentSettings.payment,
			email: order.paymentContacts.email,
			phone: order.paymentContacts.phone,
			address: order.paymentSettings.address,
			total: order.totalPrice,
			items: order.items,
		};

		return this.post<OrderResponse>('/order', payload, 'POST');
	}
}
