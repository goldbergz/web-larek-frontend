import { ApiListResponse } from "../../types/base/Api";
import { IProduct, Order } from "../../types/base/DataTypes";
import { IApiService } from "../../types/model/ProductApi";
import { Api } from "./api";

export type OrderResponse = {
  id: string;
  total: number;
};

export class ApiService extends Api implements IApiService {

  async getProducts(): Promise<IProduct[]> {
    const res = await this.get<ApiListResponse<IProduct>>('/product');
    return res.items;
  }

  async getProductById(id: string): Promise<IProduct> {
    return this.get<IProduct>(`/product/${id}`);
  }


  async createOrder(order: Order): Promise<OrderResponse> {
    return this.post<OrderResponse>('/order', order, 'POST');
  }
}