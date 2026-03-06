import { Category, Product } from "../types";

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'main', name: 'Main Course', icon: '🍛' },
  { id: 'fastfood', name: 'Fast Food', icon: '🍔' },
  { id: 'drinks', name: 'Drinks', icon: '🍹' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chicken Burger',
    price: 180,
    rating: 4.5,
    description: 'Grilled chicken with cheese, lettuce, and our secret sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'fastfood'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 250,
    rating: 4.8,
    description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    category: 'fastfood'
  },
  {
    id: '3',
    name: 'Paneer Tikka',
    price: 220,
    rating: 4.6,
    description: 'Marinated paneer cubes grilled to perfection in a tandoor.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    category: 'starters'
  },
  {
    id: '4',
    name: 'Butter Chicken',
    price: 320,
    rating: 4.9,
    description: 'Tender chicken in a rich, creamy tomato-based gravy.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    category: 'main'
  },
  {
    id: '5',
    name: 'Chocolate Brownie',
    price: 150,
    rating: 4.7,
    description: 'Warm chocolate brownie served with vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  },
  {
    id: '6',
    name: 'Virgin Mojito',
    price: 120,
    rating: 4.4,
    description: 'Refreshing blend of lime, mint, and soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    category: 'drinks'
  },
  {
    id: '7',
    name: 'Caesar Salad',
    price: 190,
    rating: 4.3,
    description: 'Fresh romaine lettuce with croutons and parmesan cheese.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    category: 'starters'
  },
  {
    id: '8',
    name: 'Hakka Noodles',
    price: 160,
    rating: 4.5,
    description: 'Stir-fried noodles with crisp vegetables and soy sauce.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    category: 'main'
  }
];
