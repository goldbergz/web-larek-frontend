import { IModal } from "../../base/Base";
import { PaymentSettings, PaymentContacts, OrderSettings } from "../../model/OrderModel";

export interface IOrderModal extends IModal {
  setStep(step: 'payment' | 'contacts' | 'success'): void;
  setPaymentData(data: PaymentSettings): void;
  setContactsData(data: PaymentContacts): void;
  setSuccessData(total: number, orderId: string): void;
  onNextStep?(callback: () => void): void;
  onPreviousStep?(callback: () => void): void;
  onSubmit?(callback: (data: OrderSettings) => void): void;
}