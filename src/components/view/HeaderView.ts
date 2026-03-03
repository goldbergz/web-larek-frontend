import { IHeaderView } from '../../types/view/HeaderView';
import { Component } from './Component';

export class HeaderView extends Component implements IHeaderView {
	private basketButton: HTMLButtonElement;
	private basketCounter: HTMLElement;

	private basketClickCb?: () => void;

	constructor(container: HTMLElement) {
		super(container);

		this.basketButton = container.querySelector(
			'.header__basket'
		) as HTMLButtonElement;

		this.basketCounter = container.querySelector(
			'.header__basket-counter'
		) as HTMLElement;

		if (!this.basketButton) throw new Error('Header basket button not found');
		if (!this.basketCounter) throw new Error('Header basket counter not found');

		this.basketButton.addEventListener('click', () => {
			this.basketClickCb?.();
		});
	}

	setCounter(count: number): void {
		this.basketCounter.textContent = String(count);
	}

	onBasketClick(callback: () => void): void {
		this.basketClickCb = callback;
	}

	render(): HTMLElement {
		return this.element;
	}
}
