import { IBasketItem, Order, PaymentContacts, PaymentSettings } from "../base/DataTypes";
import { IModel } from "../base/Model";

export type OrderStep = 'payment' | 'contacts' | 'success';

export interface IOrderModel extends 
  IModel<Order> {
  paymentSettings?: PaymentSettings;
  paymentContacts?: PaymentContacts;

  setPaymentSettings(settings: PaymentSettings): void;
  setContacts(contacts: PaymentContacts): void;
  getOrderData(items: IBasketItem[]): Order
  validatePayment(): boolean;
  validateContacts(): boolean;
}

export type ValidationError = {
  field: string;
  message: string;
};