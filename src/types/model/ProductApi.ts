export type OrderResponse = {
	total: number;
	id: string;
};

export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: string
}

export interface PaymentSettings {
  paymentType: "online" | "upon receipt";
  address: string
}

export interface PaymentContacts {
  email: string;
  phone: string
}

export interface OrderSettings {
  paymentSettings: PaymentSettings;
  paymentContacts: PaymentContacts
}

export interface Order extends OrderSettings {
  products: Product[];
  totalPrice: number
}

export interface ProductApiClient {
  getProducts: () => Promise<Product[]>;
  getProduct: (id: string) => Promise<Product>;
  createOrder: (order: Order) => Promise<OrderResponse>;
}