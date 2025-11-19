export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: string
}

export interface IProductShort {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
}

export interface IBasketItem {
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IBasketState {
  items: IBasketItem[];
  total: number;
  totalPrice: number;
}

export interface IProductSettings {
	description: string;
  image: string;
  title: string;
  category: string;
  price: string
  modalClass: string;
  basketClass: string;
  isModalMode: boolean;
	isBasketMode: boolean;
}