import {
	IBasketItem,
	IProduct,
	Order,
	PaymentContacts,
	PaymentSettings,
} from './DataTypes';

export enum AppEvents {
	PRODUCTS_LOADED = 'products:loaded',
	PRODUCT_SELECTED = 'product:selected',
	PRODUCT_ADD_TO_BASKET = 'product:add_to_basket',
	PRODUCT_REMOVE_FROM_BASKET = 'product:remove_from_basket',

	BASKET_OPEN = 'basket:open',
	BASKET_UPDATED = 'basket:updated',

	ORDER_START = 'order:start',
	ORDER_PAYMENT_SET = 'order:payment:set',
	ORDER_CONTACTS_SET = 'order:contacts:set',
	ORDER_SUCCESS = 'order:success',
	ORDER_STEP_CHANGE = 'order:step:change',

	MODAL_OPEN = 'modal:open',
	MODAL_CLOSE = 'modal:close',
}

export interface ModalData {
	type: 'product' | 'basket' | 'order' | 'success';
	data?: unknown;
}

export interface OrderData {
	order: Order;
	step: 'payment' | 'contacts' | 'success';
}

export interface EventMap {
	'products:loaded': { products: IProduct[] };
	'product:selected': { productId: string };
	'product:add_to_basket': { product: IProduct };
	'product:remove_from_basket': { productId: string };

	'basket:open': void;
	'basket:updated': {
		items: IBasketItem[];
		totalPrice: number;
		totalQuantity: number;
	};

	'order:start': void;
	'order:payment:set': PaymentSettings;
	'order:contacts:set': PaymentContacts;
	'order:success': { orderId: string; total: number };
	'order:step:change': OrderData;

	'modal:open': ModalData;
	'modal:close': void;
}
