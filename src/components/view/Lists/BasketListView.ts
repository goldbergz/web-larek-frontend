import { IBasketItem } from '../../../types/base/DataTypes';
import { IBasketListView } from '../../../types/view/Lists/BasketList';
import { ProductBasketView } from '../ProductView/ProductBasketView';
import { List } from './List';

export class BasketListView
	extends List<IBasketItem>
	implements IBasketListView
{
	private updateQuantityCb?: (productId: string, quantity: number) => void;
	private removeItemCb?: (productId: string) => void;

	constructor(container: HTMLElement, private template: HTMLTemplateElement) {
		super(container);
	}

	protected renderItem(item: IBasketItem, index: number): HTMLElement {
		const card = new ProductBasketView(this.template);
		card.setBasketItem(item);

		const element = card.element;

		const indexElement = element.querySelector<HTMLElement>(
			'.basket__item-index'
		);
		if (indexElement) {
			indexElement.textContent = String(index + 1);
		}

		const deleteButton = element.querySelector<HTMLButtonElement>(
			'.basket__item-delete'
		);
		if (deleteButton) {
			deleteButton.addEventListener('click', (event) => {
				event.stopPropagation();
				this.removeItemCb?.(item.product.id);
			});
		}

		return element;
	}

	onUpdateQuantity(
		callback: (productId: string, quantity: number) => void
	): void {
		this.updateQuantityCb = callback;
	}

	onRemoveItem(callback: (productId: string) => void): void {
		this.removeItemCb = callback;
	}
}
