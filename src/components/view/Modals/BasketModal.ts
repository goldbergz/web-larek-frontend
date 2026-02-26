import { IBasketItem } from '../../../types/base/DataTypes';
import { IBasketModal } from '../../../types/view/Modals/BasketModal';
import { BasketListView } from '../Lists/BasketListView';
import { Modal } from './Modal';

export class BasketModal extends Modal implements IBasketModal {
	private basketTemplate: HTMLTemplateElement;
	private itemTemplate: HTMLTemplateElement;

	private listView?: BasketListView;
	private totalPriceElement?: HTMLElement;
	private submitButton?: HTMLButtonElement;

	private items: IBasketItem[] = [];

	private updateTotalSumCb?: (sum: number) => void;
	private submitCb?: () => void;
	private removeItemCb?: (productId: string) => void;

	constructor(
		element: HTMLElement,
		basketTemplate: HTMLTemplateElement,
		itemTemplate: HTMLTemplateElement
	) {
		super(element);
		this.basketTemplate = basketTemplate;
		this.itemTemplate = itemTemplate;
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

		const listContainer =
			basketElement.querySelector('.basket__list') as HTMLElement;
		const totalPriceElement =
			basketElement.querySelector('.basket__price') as HTMLElement;
		const submitButton =
			basketElement.querySelector('.basket__button') as HTMLButtonElement;

		if (!listContainer || !totalPriceElement || !submitButton) {
			throw new Error('Basket modal markup is invalid');
		}

		this.listView = new BasketListView(listContainer, this.itemTemplate);
		this.totalPriceElement = totalPriceElement;
		this.submitButton = submitButton;

		if (this.removeItemCb) {
			this.listView.onRemoveItem?.(this.removeItemCb);
		}

		this.submitButton.addEventListener('click', () => {
			if (!this.submitButton || this.submitButton.disabled) return;
			this.submitCb?.();
		});
	}

	updateBasket(items: IBasketItem[]): void {
		this.items = items;
		if (!this.isOpen() && !this.listView) {
			return;
		}

		if (!this.listView) {
			this.initView();
		}

		this.listView!.setItems(this.items);

		const total = this.items.reduce(
			(sum, item) => sum + (item.product.price ?? 0),
			0
		);

		if (this.totalPriceElement) {
			this.totalPriceElement.textContent = `${total} синапсов`;
		}

		if (this.submitButton) {
			this.submitButton.disabled = items.length === 0;
		}

		this.updateTotalSumCb?.(total);
	}

	onUpdateTotalSum(callback: (sum: number) => void): void {
		this.updateTotalSumCb = callback;
	}

	onSubmit(callback: () => void): void {
		this.submitCb = callback;
	}

	onRemoveItem(callback: (productId: string) => void): void {
		this.removeItemCb = callback;
		if (this.listView) {
			this.listView.onRemoveItem?.(callback);
		}
	}
}
