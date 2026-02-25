import {
	IBasketItem,
	Order,
	PaymentContacts,
	PaymentSettings,
} from '../base/DataTypes';
import { IModel } from '../base/Model';

export type OrderStep = 'payment' | 'contacts' | 'success';

export interface IOrderState {
	step: OrderStep;

	paymentSettings: PaymentSettings | null;
	paymentContacts: PaymentContacts | null;

	items: IBasketItem[];
	totalPrice: number;

	validationErrors: ValidationError[];
}

export interface IOrderModel extends IModel<IOrderState> {
	setStep(step: OrderStep): void;
	setPaymentSettings(settings: PaymentSettings): void;
	setContacts(contacts: PaymentContacts): void;
	setItems(items: IBasketItem[]): void;
	getOrderData(): Order;
	validatePayment(): boolean;
	validateContacts(): boolean;
	reset(): void;
}

export type ValidationError = {
	field: string;
	message: string;
};
