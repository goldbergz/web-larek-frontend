export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number
}

export interface IBasketItem {
  product: IProduct;
  price: number;
  quantity: number;
}

export interface IBasketState {
  items: IBasketItem[];
  totalQuantity: number;
  totalPrice: number;
}