export interface CartProduct {
  id: number;
  title: string;
  price: number; // Precio en USD
  image: string;
  category: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface CartSummary {
  totalItems: number;
  totalCents: number;
  totalPrice: number; // totalPrice en dólares decimales
}
