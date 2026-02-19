import { PaymentSettings, PaymentContacts, IBasketItem, Order } from "../../types/base/DataTypes";
import { IOrderState, IOrderModel, OrderStep, ValidationError } from "../../types/model/OrderModel";
import { Model } from "../base/Model";

export class OrderModel
  extends Model<IOrderState>
  implements IOrderModel {
  constructor() {
    super({
      step: 'payment',
      paymentSettings: null,
      paymentContacts: null,
      items: [],
      totalPrice: 0,
      validationErrors: []
    });
  }

  setStep(step: OrderStep): void {
    this.setState({
      ...this.state,
      step
    })
  }

  setPaymentSettings(settings: PaymentSettings): void {
    this.setState({
      ...this.state,
      paymentSettings: settings,
      validationErrors: this.removeErrors(['paymentType', 'address'])
    })
  }

  setContacts(contacts: PaymentContacts): void {
    this.setState({
      ...this.state,
      paymentContacts: contacts,
      validationErrors: this.removeErrors(['email', 'phone'])
    })
  }

  setItems(items: IBasketItem[]): void {
    const totalPrice = items.reduce(
      (sum, i) => sum + i.product.price,
      0
    );

    this.setState({
      ...this.state,
      items,
      totalPrice
    });
  }

  getOrderData(): Order {
    const state = this.state;

    if (!state.paymentSettings || !state.paymentContacts) {
      throw new Error("Order data incomplete");
    }

    return {
      items: state.items,
      totalPrice: state.totalPrice,
      paymentSettings: state.paymentSettings,
      paymentContacts: state.paymentContacts
    };
  }

  validatePayment(): boolean {
    const errors: ValidationError[] = [];
    const data = this.state.paymentSettings;

    if (!data?.paymentType) {
      errors.push({
        field: 'paymentType',
        message: 'Выберите способ оплаты'
      });
    }

    if (!data?.address?.trim()) {
      errors.push({
        field: 'address',
        message: 'Введите адрес доставки'
      });
    }

    this.setValidationErrors(errors);

    return errors.length === 0;
  }

  validateContacts(): boolean {
    const errors: ValidationError[] = [];
    const data = this.state.paymentContacts;

    if (!data?.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.push({
        field: 'email',
        message: 'Некорректный email'
      });
    }

    if (!data?.phone || data.phone.trim().length < 5) {
      errors.push({
        field: 'phone',
        message: 'Некорректный телефон'
      });
    }

    this.setValidationErrors(errors);

    return errors.length === 0;
  }

  reset(): void {
    this.setState({
      step: 'payment',
      paymentSettings: null,
      paymentContacts: null,
      items: [],
      totalPrice: 0,
      validationErrors: []
    });
  }

  private setValidationErrors(errors: ValidationError[]) {
    this.setState({
      ...this.state,
      validationErrors: errors
    });
  }

  private removeErrors(fields: string[]): ValidationError[] {
    return this.state.validationErrors.filter(
      e => !fields.includes(e.field)
    );
  }
}