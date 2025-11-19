export type OrderResponse = {
	total: number;
	id: string;
};

interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: string
}

interface PaymentSettings {
  paymentType: "online" | "upon receipt";
  address: string
}

interface PaymentContacts {
  email: string;
  phone: string
}

interface OrderSettings {
  paymentSettings: PaymentSettings;
  paymentContacts: PaymentContacts
}

interface Order extends OrderSettings {
  products: Product[];
  totalPrice: number
}

export interface ProductApiClient {
  getProducts: () => Promise<Product[]>;
  getProduct: () => Promise<Product>;
  createOrder: (order: Order) => Promise<OrderResponse>;
}