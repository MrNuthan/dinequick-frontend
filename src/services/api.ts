import axios from 'axios';
import { Order, Product, Category } from '../types';

// const API_BASE = 'http://localhost:8000/api';
const API_BASE = "https://dinequick-backend-5e5y.onrender.com/api"

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const api = {
  getProducts: async () => {
    return client.get<Product[]>('/products/');
  },

  getCategories: async () => {
    return client.get<Category[]>('/categories/');
  },

  placeOrder: async (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    // Map frontend shape to the backend contract
    const payload = {
      tableNumber: order.tableNumber,
      items: order.items.map(item => ({
        product: item.id,
        quantity: item.quantity,
      })),
      specialInstructions: order.specialInstructions || '',
      total: order.total,
    };
    return client.post<Order>('/orders/', payload);
  },

  getOrderStatus: async (orderId: string) => {
    return client.get<{ status: string }>(`/orders/${orderId}/status/`);
  },

  createPaymentOrder: async (orderId: number) => {
    return client.post<{ razorpay_order_id: string }>('/payments/create-order/', {
      order_id: orderId,
    });
  },

  verifyPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    return client.post('/payments/verify/', data);
  },
};
