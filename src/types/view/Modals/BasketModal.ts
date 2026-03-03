import { IModal } from '../../base/View';

export interface IBasketModal extends IModal {
  updateBasket(elements: HTMLElement[], totalPrice: number, isEmpty: boolean): void;
}
