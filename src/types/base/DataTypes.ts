export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBasketItem {
  product: IProduct;
}

export interface PaymentSettings {
  paymentType: "online" | "upon receipt";
  address: string;
}

export interface PaymentContacts {
  email: string;
  phone: string;
}

export interface OrderSettings {
  paymentSettings: PaymentSettings;
  paymentContacts: PaymentContacts;
}

export interface Order extends OrderSettings {
  items: IBasketItem[];
  totalPrice: number;
}

