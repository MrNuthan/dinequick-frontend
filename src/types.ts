export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'served';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  tableNumber: string;
  status: OrderStatus;
  specialInstructions?: string;
  createdAt: string;
}
