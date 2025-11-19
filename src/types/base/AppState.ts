import { PaymentSettings, PaymentContacts, Order, OrderResponse } from '../model/ProductApi';
import { IBasketItem, IProduct } from './DataTypes';

export enum AppStateModals {
	product = 'modal:product',
  basket = 'modal:basket',
  address = 'modal: address',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

export enum AppStateChanges {
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	basket = 'change:basket',
	order = 'change:order',
}

export interface UIStateModel {
  openedModal: AppStateModals;
  modalMessage?:  | null;

  openModal(type: AppStateModals, payload?: unknown): void;
  closeModal(): void;
  setModalMessage(message: string | null): void;
}

export enum AppEvents {
  // Продукты
  PRODUCTS_LOADED = 'products:loaded',
  PRODUCT_SELECTED = 'product:selected',
  PRODUCT_ADD_TO_CART = 'product:add_to_cart',
  PRODUCT_REMOVE_FROM_CART = 'product:remove_from_cart',
  
  // Корзина
  CART_ADD = 'cart:add',
  CART_REMOVE = 'cart:remove',
  CART_UPDATE = 'cart:update',
  CART_OPEN = 'cart:open',
  
  // Заказы
  ORDER_START = 'order:start',
  ORDER_PAYMENT_SET = 'order:payment:set',
  ORDER_CONTACTS_SET = 'order:contacts:set',
  ORDER_SUCCESS = 'order:success',
  ORDER_STEP_CHANGE = 'order:step:change',
  
  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',
  
  UI_CART_ICON_CLICK = 'ui:cart_icon:click'
}

export interface ProductEvent {
  product: IProduct;
}

export interface BasketEvent {
  productId: string;
  product?: IProduct;
  quantity?: number;
}

export interface CartUpdateEvent {
  items: IBasketItem[];
  total: number;
  totalPrice: number;
}

export interface PaymentEvent {
  paymentSettings: PaymentSettings;
}

export interface ContactsEvent {
  paymentContacts: PaymentContacts;
}

export interface OrderEvent {
  order: Order;
  response?: OrderResponse;
}

export interface OrderStepEvent {
  step: number;
  previousStep: number;
}

export interface ModalEvent {
  modal: string;
  data?: unknown;
}

export interface ErrorEvent {
  message: string;
  field?: string;
}