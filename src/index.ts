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
import { AppEvents } from './types/base/AppEvents';
import { IProduct } from './types/base/DataTypes';
import { API_URL } from './utils/constants';

const emitter = new EventEmitter();
const events = new TypedEvents<any>(emitter);
const api = new ApiService(API_URL);

const productModel = new ProductModel();
const basketModel = new BasketModel();
const orderModel = new OrderModel();

const gallery = document.querySelector('.gallery') as HTMLElement;
const modalRoot = document.getElementById('modal-container') as HTMLElement;
const basketCounter = document.querySelector('.header__basket-counter')!;
const basketButton = document.querySelector('.header__basket')!;
const cardTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;
const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
const basketItemTemplate = document.getElementById('card-basket') as HTMLTemplateElement;

const productListView = new ProductListView(gallery, cardTemplate);
const productModal = new ProductModal(modalRoot, cardPreviewTemplate);
const basketModal = new BasketModal(modalRoot, basketTemplate, basketItemTemplate);

async function loadProducts() {
  try {
    productModel.setLoading(true);

    const products = await api.getProducts();
    productModel.setProducts(products);

    events.emit(AppEvents.PRODUCTS_LOADED, { products });
  } catch (err: any) {
    productModel.setError(err.message);
  }
}

loadProducts();

events.on(AppEvents.PRODUCTS_LOADED, ({ products }: { products: IProduct[] }) => {
  productListView.setItems(products);

  productListView.onProductClick(product => {
    events.emit(AppEvents.PRODUCT_SELECTED, { productId: product.id });
  });
});

events.on(AppEvents.PRODUCT_SELECTED, ({ productId }) => {
  const product = productModel.getProductById(productId);
  console.log(product)
  if (!product) return;
  const isInBasket = basketModel.items.some(item => item.product.id === product.id);
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

basketModel.addChangeListener(state => {
  basketCounter.textContent = state.items.length.toString();
  events.emit(AppEvents.BASKET_UPDATED, {
    items: state.items,
    totalPrice: state.totalPrice,
    totalQuantity: state.totalQuantity,
  });
});

basketButton.addEventListener('click', () => {
  events.emit(AppEvents.BASKET_OPEN, {});
});

events.on(AppEvents.BASKET_OPEN, () => {
  const state = basketModel.getState();
  basketModal.open();
  basketModal.updateBasket(state.items);
});

events.on(AppEvents.BASKET_UPDATED, ({ items }) => {
  basketModal.updateBasket(items);
});

basketModal.onRemoveItem((productId: string) => {
  basketModel.removeProduct(productId);
  events.emit(AppEvents.PRODUCT_REMOVE_FROM_BASKET, { productId });
});

basketModal.onSubmit(() => {
  events.emit(AppEvents.ORDER_START, {});
});


