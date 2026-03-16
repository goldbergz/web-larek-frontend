import { Modal } from './Modal';

export class SuccessModal extends Modal {
	constructor(element: HTMLElement, private template: HTMLTemplateElement) {
		super(element);
	}

	render(): HTMLElement {
		return this.element;
	}

	showSuccess(total: number): void {
		if (!this.content) return;

		this.content.innerHTML = '';

		const el = this.template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;

		const desc = el.querySelector('.order-success__description');

		if (desc) {
			desc.textContent = `Списано ${total} синапсов`;
		}

		el.querySelector('.order-success__close')?.addEventListener('click', () => {
			this.close();
		});

		this.content.appendChild(el);
	}
}
