import { IBasketItem } from '../../../types/base/DataTypes';
import { IDataView } from '../../../types/base/View';
import { IBasketItemView } from '../../../types/view/ProductCard/ProductCard';
import { Component } from '../Component';

export class ProductBasketView
	extends Component
	implements IDataView<IBasketItem>, IBasketItemView
{
	private basketItem!: IBasketItem;

	private titleElement: HTMLElement;
	private priceElement: HTMLElement;
	private deleteButton: HTMLButtonElement | null;

	constructor(template: HTMLTemplateElement) {
		const element = template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;
		super(element);

		this.titleElement = this.element.querySelector(
			'.card__title'
		) as HTMLElement;
		this.priceElement = this.element.querySelector(
			'.card__price'
		) as HTMLElement;
		this.deleteButton = this.element.querySelector<HTMLButtonElement>(
			'.basket__item-delete'
		);
	}

	render(): HTMLElement {
		throw new Error('Method not implemented.');
	}

	setBasketItem(item: IBasketItem): void {
		this.basketItem = item;
		this.update(item);
	}

	update(data: Partial<IBasketItem>): HTMLElement {
		const product = data.product ?? this.basketItem?.product;

		if (!product) {
			return this.element;
		}

		if (product.title !== undefined) {
			this.titleElement.textContent = product.title;
		}

		if (product.price !== undefined && product.price !== null) {
			this.priceElement.textContent = `${product.price} синапсов`;
		} else {
			this.priceElement.textContent = 'Бесценно';
		}

		return this.element;
	}

	getProduct(): IBasketItem {
		return this.basketItem;
	}
}
