import { IProduct } from '../../../types/base/DataTypes';
import { IProductModalView } from '../../../types/view/Modals/ProductModal';
import { CDN_URL } from '../../../utils/constants';
import { CATEGORY_CLASS_MAP } from '../ProductView/ProductCardView';
import { Modal } from './Modal';

export class ProductModal extends Modal implements IProductModalView {
	private product?: IProduct;
	private addToBasketCb?: (product: IProduct) => void;
	private removeFromBasketCb?: (product: IProduct) => void;
	private inBasket = false;

	private addButton!: HTMLButtonElement;
	private cardElement?: HTMLElement;

	constructor(element: HTMLElement, private template: HTMLTemplateElement) {
		super(element);
	}

	private initView(): void {
		if (!this.content) {
			throw new Error('Product modal content element not found');
		}

		this.content.innerHTML = '';

		const card = this.template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;
		this.content.appendChild(card);

		this.cardElement = card;

		const addButton = this.cardElement.querySelector(
			'.card__row .button'
		) as HTMLButtonElement;
		if (!addButton) {
			throw new Error(
				'Add-to-basket button not found in product modal template'
			);
		}

		this.addButton = addButton;
		this.addButton.addEventListener('click', () => this.toggleBasket());
	}

	render(): HTMLElement {
		return this.element;
	}

	setProduct(product: IProduct): void {
		this.initView();
		this.product = product;
		this.update(product);
		this.open();
	}

	setInBasket(isInBasket: boolean): void {
		this.inBasket = isInBasket;
		this.updateButton();
	}

	onAddToBasket(callback: (product: IProduct) => void): void {
		this.addToBasketCb = callback;
	}

	onRemoveFromBasket(callback: (product: IProduct) => void): void {
		this.removeFromBasketCb = callback;
	}

	update(data: Partial<IProduct>): HTMLElement {
		if (!this.product || !this.cardElement) return this.element;

		const category = this.cardElement.querySelector(
			'.card__category'
		) as HTMLElement;
		const title = this.cardElement.querySelector('.card__title') as HTMLElement;
		const image = this.cardElement.querySelector(
			'img.card__image'
		) as HTMLImageElement;
		const price = this.cardElement.querySelector('.card__price') as HTMLElement;

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

		this.updateButton();

		return this.element;
	}

	private toggleBasket(): void {
		if (!this.product) return;

		this.inBasket = !this.inBasket;
		this.updateButton();

		if (this.inBasket) {
			this.addToBasketCb?.(this.product);
		} else {
			this.removeFromBasketCb?.(this.product);
		}
	}

	private updateButton(): void {
		if (!this.addButton) return;

		this.addButton.textContent = this.inBasket ? 'Убрать' : 'Добавить';
	}
}
