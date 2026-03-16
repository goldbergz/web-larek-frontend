import { IModal } from '../../base/View';
import {
	PaymentSettings,
	PaymentContacts,
	OrderSettings,
} from '../../base/DataTypes';

export interface IOrderModal extends IModal {
	setStep(step: 'payment' | 'contacts' | 'success'): void;
	setPaymentData(data: PaymentSettings): void;
  setContactsData(data: PaymentContacts): void;
  setValid(value: boolean): void;
  onPaymentChange(callback: () => void): void;
  onContactsChange(callback: () => void): void;
	onNextStep?(callback: () => void): void;
	onSubmit?(callback: (data: OrderSettings) => void): void;
}