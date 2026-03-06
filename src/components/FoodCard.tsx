import React from 'react';
import { Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface FoodCardProps {
  product: Product;
}

export const FoodCard: React.FC<FoodCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="relative h-40 w-full block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold">{product.rating}</span>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-lg leading-tight mb-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-secondary/60 text-xs line-clamp-2 mb-3 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-primary text-lg">₹{product.price}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
