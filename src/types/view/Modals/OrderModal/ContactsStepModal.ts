import { PaymentContacts } from "../../../model/ProductApi";
import { IOrderModal } from "./OrderModal";

export interface IContactsStepModal extends IOrderModal {
  setContactsData(data: PaymentContacts): void;
}