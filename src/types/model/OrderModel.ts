import { IBasketItem, Order, PaymentContacts, PaymentSettings } from "../base/DataTypes";
import { IModel } from "../base/Model";
import { OrderResponse } from "./ProductApi";

export interface IOrderModel extends IModel<Order> {
  setPaymentSettings(settings: PaymentSettings): void;
  setContacts(contacts: PaymentContacts): void;
  isPaymentSettingsValid(): boolean;
  isContactsValid(): boolean;
  createOrder(BasketItems: IBasketItem[]): Promise<OrderResponse>;
}

export type ValidationError = {
  field: string;
  message: string;
};