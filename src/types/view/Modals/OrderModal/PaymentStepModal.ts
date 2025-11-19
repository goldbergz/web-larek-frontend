import { PaymentSettings } from "../../../model/ProductApi";
import { IOrderModal } from "./OrderModal";

export interface IPaymentStepModal extends IOrderModal {
  setPaymentData(data: PaymentSettings): void;
}