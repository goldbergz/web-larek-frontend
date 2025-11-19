import { IModal } from "../../base/Model";

export interface ISuccessModal extends IModal {
  setOrderData(total: number, orderId: string): void;
  onClose?(callback: () => void): void;
}