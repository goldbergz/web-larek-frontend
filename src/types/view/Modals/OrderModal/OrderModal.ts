import { IModal } from "../../../base/Model";

export interface IOrderModal extends IModal {
  setStep(step: number): void;
  onNextStep?(callback: () => void): void;
  onPreviousStep?(callback: () => void): void;
  onSubmit?(callback: (data: any) => void): void;
}