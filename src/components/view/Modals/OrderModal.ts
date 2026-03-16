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

	private paymentSettings?: PaymentSettings;
	private paymentContacts?: PaymentContacts;

	private step: 'payment' | 'contacts' = 'payment';
	private paymentChangeCb?: (data: PaymentSettings) => void;
	private contactsChangeCb?: (data: PaymentContacts) => void;
	private nextStepCb?: () => void;
	private submitCb?: (data: OrderSettings) => void;

	constructor(
		element: HTMLElement,
		orderTemplate: HTMLTemplateElement,
		contactsTemplate: HTMLTemplateElement
	) {
		super(element);
		this.orderTemplate = orderTemplate;
		this.contactsTemplate = contactsTemplate;
	}

	render(): HTMLElement {
		return this.element;
	}

	setStep(step: 'payment' | 'contacts'): void {
		this.step = step;
		this.renderStep();
	}

	private renderStep(): void {
		if (!this.content) return;
		this.content.innerHTML = '';

		if (this.step === 'payment') this.renderPayment();
		if (this.step === 'contacts') this.renderContacts();
	}

	private renderPayment(): void {
		const form = this.orderTemplate.content.firstElementChild!.cloneNode(
			true
		) as HTMLFormElement;

		const address = form.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		const cardBtn = form.querySelector(
			'button[name="card"]'
		) as HTMLButtonElement;
		const cashBtn = form.querySelector(
			'button[name="cash"]'
		) as HTMLButtonElement;

		let paymentType: PaymentSettings['payment'] | undefined;

		const emitChange = () => {
			this.paymentSettings = {
				payment: paymentType as PaymentSettings['payment'],
				address: address.value,
			};

			this.paymentChangeCb?.(this.paymentSettings);
		};

		cardBtn.onclick = () => {
			paymentType = 'online';
			emitChange();
		};

		cashBtn.onclick = () => {
			paymentType = 'upon receipt';
			emitChange();
		};

		address.oninput = () => {
			emitChange();
		};

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

		const email = form.querySelector('input[name="email"]') as HTMLInputElement;
		const phone = form.querySelector('input[name="phone"]') as HTMLInputElement;

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

	setPaymentData(
		data: PaymentSettings & { valid?: boolean; errors?: string[] }
	): void {
		const cardBtn = this.content?.querySelector<HTMLButtonElement>(
			'button[name="card"]'
		);
		const cashBtn = this.content?.querySelector<HTMLButtonElement>(
			'button[name="cash"]'
		);
		const err = this.content?.querySelector<HTMLElement>('.form__errors');

		cardBtn?.classList.remove('button_alt-active');
		cashBtn?.classList.remove('button_alt-active');

		if (data.payment === 'online') {
			cardBtn?.classList.add('button_alt-active');
		}

		if (data.payment === 'upon receipt') {
			cashBtn?.classList.add('button_alt-active');
		}

		if (err && data.errors) {
			err.textContent = data.errors.join(', ');
		}
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

	setValid(value: boolean) {
		const btn = this.content?.querySelector<HTMLButtonElement>(
			'button[type="submit"]'
		);

		if (btn) {
			btn.disabled = !value;
		}
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
