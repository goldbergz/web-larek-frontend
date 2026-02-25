import { IModal } from '../../../types/base/View';
import { DataView } from '../../base/View';

export abstract class Modal extends DataView<unknown> implements IModal {
	closeButton: HTMLButtonElement;
	content?: HTMLElement;
	private pageWrapper: HTMLElement | null;

	protected _isOpen = false;

	constructor(element: HTMLElement) {
		super(element);

		this.pageWrapper = document.querySelector<HTMLElement>('.page__wrapper');

		const closeBtn = element.querySelector<HTMLButtonElement>('.modal__close');
		if (!closeBtn) throw new Error('Modal close button not found');
		this.closeButton = closeBtn;

		this.closeButton.addEventListener('click', () => this.close());
		element.addEventListener('click', (e) => {
			if (e.target === element) this.close();
		});

		this.content =
			element.querySelector<HTMLElement>('.modal__content') ?? undefined;
	}

	open(): void {
		this.toggleClass('modal_active', true);
		this.pageWrapper?.classList.add('page__wrapper_locked');
		this._isOpen = true;
	}

	close(): void {
		this.toggleClass('modal_active', false);
		this.pageWrapper?.classList.remove('page__wrapper_locked');
		this._isOpen = false;
	}

	isOpen(): boolean {
		return this._isOpen;
	}

	update(data: Partial<unknown>): HTMLElement {
		return this.element;
	}
}
