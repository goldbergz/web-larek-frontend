import { IBasketModal } from '../../../types/view/Modals/BasketModal';
import { BasketListView } from '../Lists/BasketListView';
import { Modal } from './Modal';

export class BasketModal extends Modal implements IBasketModal {
	private listView?: BasketListView;
	private totalPriceElement?: HTMLElement;
	private submitButton?: HTMLButtonElement;

	constructor(
		element: HTMLElement,
		private basketTemplate: HTMLTemplateElement,
	) {
		super(element);
	}

	render(): HTMLElement {
		return this.element;
	}

	private initView(): void {
		if (!this.content) {
			throw new Error('Basket modal content element not found');
		}

		this.content.innerHTML = '';

		const basketElement =
			this.basketTemplate.content.firstElementChild!.cloneNode(
				true
			) as HTMLElement;
		this.content.appendChild(basketElement);

		const listContainer = basketElement.querySelector(
			'.basket__list'
		) as HTMLElement;
		const totalPriceElement = basketElement.querySelector(
			'.basket__price'
		) as HTMLElement;
		const submitButton = basketElement.querySelector(
			'.basket__button'
		) as HTMLButtonElement;

		if (!listContainer || !totalPriceElement || !submitButton) {
			throw new Error('Basket modal markup is invalid');
		}

		this.listView = new BasketListView(listContainer);

		this.submitButton.addEventListener('click', () => {
			if (this.submitButton?.disabled) return;
			this.element.dispatchEvent(new CustomEvent('basket:submit', { bubbles: true }));
		});
	}

  updateBasket(elements: HTMLElement[], totalPrice: number, isEmpty: boolean): void {
     if (!this.listView) {
      this.initView();
     }
    
		this.listView!.setElements(elements);

    if (this.totalPriceElement) {
      this.totalPriceElement.textContent = `${totalPrice} синапсов`;
    }

    if (this.submitButton) {
      this.submitButton.disabled = isEmpty;
    }
	}

	update(data: Partial<unknown>): HTMLElement {
    return this.element;
  }
}
