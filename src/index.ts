import { ApiService } from './components/base/ApiService';
import { EventEmitter } from './components/base/events';
import { TypedEvents } from './components/base/TypedEvents';
import { BasketModel } from './components/model/BasketModel';
import { OrderModel } from './components/model/OrderModel';
import { ProductModel } from './components/model/ProductModel';
import { ProductListView } from './components/view/Lists/ProductListView';
import { ProductModal } from './components/view/Modals/ProductModal';
import { BasketModal } from './components/view/Modals/BasketModal';
import './scss/styles.scss';
import { AppEvents, EventMap } from './types/base/AppEvents';
import { IBasketItem } from './types/base/DataTypes';
import { API_URL } from './utils/constants';
import { OrderModal } from './components/view/Modals/OrderModal';
import { ProductCardView } from './components/view/ProductView/ProductCardView';
import { ProductBasketView } from './components/view/ProductView/ProductBasketView';
import { HeaderView } from './components/view/HeaderView';
import { SuccessModal } from './components/view/Modals/SuccessModal';

const emitter = new EventEmitter();
const events = new TypedEvents<EventMap>(emitter);
const api = new ApiService(API_URL);

const productModel = new ProductModel();
const basketModel = new BasketModel();
const orderModel = new OrderModel();

const gallery = document.querySelector('.gallery') as HTMLElement;
const modalRoot = document.getElementById('modal-container') as HTMLElement;
const headerElement = document.querySelector('.header') as HTMLElement;

const cardTemplate = document.getElementById(
	'card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.getElementById(
	'card-preview'
) as HTMLTemplateElement;
const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
const basketItemTemplate = document.getElementById(
	'card-basket'
) as HTMLTemplateElement;
const orderTemplate = document.getElementById('order') as HTMLTemplateElement;
const contactsTemplate = document.getElementById(
	'contacts'
) as HTMLTemplateElement;
const successTemplate = document.getElementById(
	'success'
) as HTMLTemplateElement;

const headerView = new HeaderView(headerElement);
const productListView = new ProductListView(gallery);
const productModal = new ProductModal(modalRoot, cardPreviewTemplate);
const basketModal = new BasketModal(modalRoot, basketTemplate);
const orderModal = new OrderModal(modalRoot, orderTemplate, contactsTemplate);
const successModal = new SuccessModal(modalRoot, successTemplate);

async function loadProducts() {
	try {
		productModel.setLoading(true);

		const products = await api.getProducts();
		productModel.setProducts(products);

		events.emit(AppEvents.PRODUCTS_LOADED, { products });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		productModel.setError(message);
	}
}

loadProducts();

events.on(AppEvents.PRODUCTS_LOADED, ({ products }) => {
	const elements = products.map((product) => {
		const card = new ProductCardView(cardTemplate);
		card.setProduct(product);
		card.element.addEventListener('click', () => {
			events.emit(AppEvents.PRODUCT_SELECTED, { productId: product.id });
		});
		return card.element;
	});

	productListView.setElements(elements);
});

events.on(AppEvents.PRODUCT_SELECTED, ({ productId }) => {
	const product = productModel.getProductById(productId);
	if (!product) return;
	const isInBasket = basketModel.items.some(
		(item) => item.product.id === product.id
	);
	productModal.setInBasket(isInBasket);

	productModal.setProduct(product);
	productModal.open();
});

productModal.onAddToBasket((product) => {
	basketModel.addProduct(product);
	productModal.setInBasket(true);
	events.emit(AppEvents.PRODUCT_ADD_TO_BASKET, { product });
});

productModal.onRemoveFromBasket((product) => {
	basketModel.removeProduct(product.id);
	productModal.setInBasket(false);
	events.emit(AppEvents.PRODUCT_REMOVE_FROM_BASKET, { productId: product.id });
});

basketModel.addChangeListener((state) => {
	headerView.setCounter(state.items.length);
	events.emit(AppEvents.BASKET_UPDATED, {
		items: state.items,
		totalPrice: state.totalPrice,
		totalQuantity: state.totalQuantity,
	});
});

headerView.onBasketClick(() => {
	events.emit(AppEvents.BASKET_OPEN, {});
});

function buildBasketElements(items: IBasketItem[]): HTMLElement[] {
	return items.map((item, index) => {
		const card = new ProductBasketView(basketItemTemplate);
		card.setBasketItem(item);
		const el = card.element;

		const indexEl = el.querySelector('.basket__item-index') as HTMLElement;
		if (indexEl) indexEl.textContent = String(index + 1);

		const deleteBtn = el.querySelector(
			'.basket__item-delete'
		) as HTMLButtonElement;
		if (deleteBtn) {
			deleteBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				basketModel.removeProduct(item.product.id);
			});
		}

		return el;
	});
}

events.on(AppEvents.BASKET_OPEN, () => {
	productModal.close();
	orderModal.close();
	const state = basketModel.getState();
	const elements = buildBasketElements(state.items);
	basketModal.updateBasket(
		elements,
		state.totalPrice,
		state.items.length === 0
	);
	basketModal.open();
});

events.on(AppEvents.BASKET_UPDATED, ({ items, totalPrice }) => {
	if (!basketModal.isOpen()) return;

	const elements = buildBasketElements(items);
	basketModal.updateBasket(elements, totalPrice, items.length === 0);
});

modalRoot.addEventListener('basket:submit', () => {
	events.emit(AppEvents.ORDER_START, {});
});

events.on(AppEvents.ORDER_START, () => {
	orderModel.reset();
	orderModel.setItems(basketModel.getState().items);

	orderModal.setStep('payment');
	orderModal.open();
});

orderModal.onPaymentChange((data) => {
	orderModel.setPaymentSettings(data);

	const valid = orderModel.validatePayment();
	const state = orderModel.getState();

	orderModal.setPaymentData({
		...state.paymentSettings!,
		errors: state.validationErrors.map((e) => e.message),
	});
	orderModal.setValid(valid);
});

orderModal.onNextStep(() => {
	if (!orderModel.validatePayment()) return;

	orderModel.setStep('contacts');
	orderModal.setStep('contacts');
});

orderModal.onContactsChange((data) => {
	orderModel.setContacts(data);

	const valid = orderModel.validateContacts();

	orderModal.setContactsData({
		...data,
		valid,
		errors: orderModel.getState().validationErrors.map((e) => e.message),
	});
});

orderModal.onSubmit(async (data) => {
	orderModel.setPaymentSettings(data.paymentSettings);
	orderModel.setContacts(data.paymentContacts);
	if (!orderModel.validateContacts()) return;

	try {
		const order = orderModel.getOrderData();

		const res = await api.createOrder(order);

		basketModel.clear();
		orderModel.reset();

		orderModal.close();

		successModal.showSuccess(res.total);
		successModal.open();
	} catch (err) {
		alert(err);
	}
});

events.on(AppEvents.ORDER_STEP_CHANGE, ({ step }) => {
	orderModal.setStep(step);
});
