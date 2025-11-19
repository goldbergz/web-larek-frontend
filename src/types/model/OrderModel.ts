import { IBasketItem } from "../base/DataTypes";
import { IModel } from "../base/Model";
import { OrderResponse } from "./ProductApi";

export interface PaymentSettings {
  paymentType: "online" | "upon receipt";
  address: string;
}

export interface PaymentContacts {
  email: string;
  phone: string;
}

export interface OrderSettings {
  paymentSettings: PaymentSettings;
  paymentContacts: PaymentContacts;
}

export interface Order extends OrderSettings {
  items: IBasketItem[];
  totalPrice: number;
}

export interface IOrderModel extends IModel<Order> {
  setPaymentSettings(settings: PaymentSettings): void;
  setContacts(contacts: PaymentContacts): void;
  isPaymentSettingsValid(): boolean;
  isContactsValid(): boolean;
  validateOrder(): { isValid: boolean; errors: string[] };
  createOrder(cartItems: IBasketItem[]): Promise<OrderResponse>;
}
