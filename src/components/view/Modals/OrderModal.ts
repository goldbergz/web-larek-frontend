import {
	PaymentSettings,
	PaymentContacts,
	OrderSettings,
} from '../../../types/base/DataTypes';
import { IOrderModal } from '../../../types/view/Modals/OrderModal';
import { Modal } from './Modal';

export class OrderModal extends Modal implements IOrderModal {
	private orderTemplate: HTMLTemplateElement;
	private contactsTemplate: HTMLTemplateElement;
	private successTemplate: HTMLTemplateElement;

	private paymentSettings?: PaymentSettings;
	private paymentContacts?: PaymentContacts;

	private step: 'payment' | 'contacts' | 'success' = 'payment';
	private paymentChangeCb?: (data: PaymentSettings) => void;
	private contactsChangeCb?: (data: PaymentContacts) => void;
	private nextStepCb?: () => void;
	private submitCb?: (data: OrderSettings) => void;

	constructor(
		element: HTMLElement,
		orderTemplate: HTMLTemplateElement,
		contactsTemplate: HTMLTemplateElement,
		successTemplate: HTMLTemplateElement
	) {
		super(element);
		this.orderTemplate = orderTemplate;
		this.contactsTemplate = contactsTemplate;
		this.successTemplate = successTemplate;
	}

	render(): HTMLElement {
		return this.element;
	}

	setStep(step: 'payment' | 'contacts' | 'success'): void {
		this.step = step;
		this.renderStep();
	}

	private renderStep(): void {
		if (!this.content) return;
		this.content.innerHTML = '';

		if (this.step === 'payment') this.renderPayment();
		if (this.step === 'contacts') this.renderContacts();
		if (this.step === 'success') this.renderSuccess();
	}

	private renderPayment(): void {
		const form = this.orderTemplate.content.firstElementChild!.cloneNode(
			true
		) as HTMLFormElement;

		const address = form.querySelector<HTMLInputElement>(
			'input[name="address"]'
		)!;
		const cardBtn = form.querySelector<HTMLButtonElement>(
			'button[name="card"]'
		)!;
		const cashBtn = form.querySelector<HTMLButtonElement>(
			'button[name="cash"]'
		)!;

		let paymentType: PaymentSettings['payment'] | null = null;

		const emitChange = () => {
			this.paymentSettings = {
				payment: paymentType ?? 'online',
				address: address.value,
			};

			this.paymentChangeCb?.(this.paymentSettings);
		};

		cardBtn.onclick = () => {
			paymentType = 'online';
			cardBtn.classList.add('button_alt-active');
			cashBtn.classList.remove('button_alt-active');
			emitChange();
		};

		cashBtn.onclick = () => {
			paymentType = 'upon receipt';
			cashBtn.classList.add('button_alt-active');
			cardBtn.classList.remove('button_alt-active');
			emitChange();
		};

		address.oninput = emitChange;

		form.onsubmit = (e) => {
			e.preventDefault();
			this.nextStepCb?.();
		};

		this.content!.appendChild(form);
	}

	private renderContacts(): void {
		const form = this.contactsTemplate.content.firstElementChild!.cloneNode(
			true
		) as HTMLFormElement;

		const email = form.querySelector<HTMLInputElement>('input[name="email"]')!;
		const phone = form.querySelector<HTMLInputElement>('input[name="phone"]')!;

		const emitChange = () => {
			this.paymentContacts = {
				email: email.value,
				phone: phone.value,
			};

			this.contactsChangeCb?.(this.paymentContacts);
		};

		email.oninput = emitChange;
		phone.oninput = emitChange;

		form.onsubmit = (e) => {
			e.preventDefault();
			if (!this.paymentSettings || !this.paymentContacts) return;
			this.submitCb?.({
				paymentSettings: this.paymentSettings,
				paymentContacts: this.paymentContacts,
			});
		};

		this.content!.appendChild(form);
	}

	private renderSuccess(): void {
		const el = this.successTemplate.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;

		el.querySelector('.order-success__close')?.addEventListener('click', () =>
			this.close()
		);

		this.content!.appendChild(el);
	}

	setSuccessData(total: number): void {
		const desc = this.content?.querySelector('.order-success__description');
		if (desc) desc.textContent = `Списано ${total} синапсов`;
	}

	setPaymentData(
		data: PaymentSettings & { valid?: boolean; errors?: string[] }
	): void {
		const btn = this.content?.querySelector<HTMLButtonElement>(
			'button[type="submit"]'
		);
		const err = this.content?.querySelector<HTMLElement>('.form__errors');

		if (btn && data.valid !== undefined) btn.disabled = !data.valid;
		if (err && data.errors) err.textContent = data.errors.join(', ');
	}

	setContactsData(
		data: PaymentContacts & { valid?: boolean; errors?: string[] }
	): void {
		const btn = this.content?.querySelector<HTMLButtonElement>(
			'button[type="submit"]'
		);
		const err = this.content?.querySelector<HTMLElement>('.form__errors');

		if (btn && data.valid !== undefined) btn.disabled = !data.valid;
		if (err && data.errors) err.textContent = data.errors.join(', ');
	}

	onPaymentChange(cb: (data: PaymentSettings) => void) {
		this.paymentChangeCb = cb;
	}

	onContactsChange(cb: (data: PaymentContacts) => void) {
		this.contactsChangeCb = cb;
	}

	onNextStep(callback: () => void): void {
		this.nextStepCb = callback;
	}

	onSubmit(callback: (data: OrderSettings) => void): void {
		this.submitCb = callback;
	}
}
