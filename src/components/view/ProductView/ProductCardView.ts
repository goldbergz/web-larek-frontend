import { IProduct } from '../../../types/base/DataTypes';
import { IDataView } from '../../../types/base/View';
import { CDN_URL } from '../../../utils/constants';
import { Component } from '../Component';

export const CATEGORY_CLASS_MAP: Record<string, string> = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	'другое': 'card__category_other',
	'дополнительное': 'card__category_additional',
	'кнопка': 'card__category_button',
};

export class ProductCardView extends Component implements IDataView<IProduct> {
	private product!: IProduct;

	constructor(template: HTMLTemplateElement) {
		const element = template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;
		super(element);
  }
  
	render(): HTMLElement {
		return this.element;
	}

	setProduct(product: IProduct): void {
		this.product = product;
		this.update(product);
	}

	update(data: Partial<IProduct>): HTMLElement {
		const category = this.element.querySelector('.card__category') as HTMLElement;
		const title = this.element.querySelector('.card__title') as HTMLElement;
		const image = this.element.querySelector(
			'.card__image'
		) as HTMLImageElement;
		const price = this.element.querySelector('.card__price') as HTMLElement;

    if (data.category && category) {
      category.textContent = data.category;

			const modifierClasses = [
				'card__category_soft',
				'card__category_hard',
				'card__category_other',
				'card__category_additional',
				'card__category_button',
			];

			category.classList.remove(...modifierClasses);

			const key = data.category.toLowerCase();
			const modifierClass = CATEGORY_CLASS_MAP[key];
			if (modifierClass) {
				category.classList.add(modifierClass);
			}
    }
		if (data.title) title.textContent = data.title;
		if (data.image) {
			image.src = data.image.startsWith('/')
				? `${CDN_URL}${data.image}`
				: data.image;
		}

		if (data.price !== undefined && data.price !== null) {
			price.textContent = `${data.price} синапсов`;
		} else {
			price.textContent = 'Бесценно';
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
