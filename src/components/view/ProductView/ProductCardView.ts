import { IProduct } from '../../../types/base/DataTypes';
import { IDataView } from '../../../types/base/View';
import { CDN_URL } from '../../../utils/constants';
import { Component } from '../Component';

export const CATEGORY_CLASS_MAP: Record<string, string> = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	другое: 'card__category_other',
	дополнительное: 'card__category_additional',
	кнопка: 'card__category_button',
};

export class ProductCardView extends Component implements IDataView<IProduct> {
	private product!: IProduct;
	private categoryElement: HTMLElement;
	private titleElement: HTMLElement;
	private imageElement: HTMLImageElement;
	private priceElement: HTMLElement;

	constructor(template: HTMLTemplateElement) {
		const element = template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;
		super(element);

		this.categoryElement = this.element.querySelector(
			'.card__category'
		) as HTMLElement;
		this.titleElement = this.element.querySelector(
			'.card__title'
		) as HTMLElement;
		this.imageElement = this.element.querySelector(
			'.card__image'
		) as HTMLImageElement;
		this.priceElement = this.element.querySelector(
			'.card__price'
		) as HTMLElement;
	}

	render(): HTMLElement {
		return this.element;
	}

	setProduct(product: IProduct): void {
		this.product = product;
		this.update(product);
	}

	update(data: Partial<IProduct>): HTMLElement {
		if (data.category && this.categoryElement) {
			this.categoryElement.textContent = data.category;

			const modifierClasses = [
				'card__category_soft',
				'card__category_hard',
				'card__category_other',
				'card__category_additional',
				'card__category_button',
			];

			this.categoryElement.classList.remove(...modifierClasses);

			const key = data.category.toLowerCase();
			const modifierClass = CATEGORY_CLASS_MAP[key];
			if (modifierClass) {
				this.categoryElement.classList.add(modifierClass);
			}
		}
		if (data.title && this.titleElement)
			this.titleElement.textContent = data.title;
		if (data.image && this.imageElement) {
			this.imageElement.src = data.image.startsWith('/')
				? `${CDN_URL}${data.image}`
				: data.image;
		}

		if (this.priceElement) {
			if (data.price !== undefined && data.price !== null) {
				this.priceElement.textContent = `${data.price} синапсов`;
			} else {
				this.priceElement.textContent = 'Бесценно';
			}
		}

		return this.element;
	}

	getId(): string {
		return this.product.id;
	}

	getProduct(): IProduct {
		return this.product;
	}
}
