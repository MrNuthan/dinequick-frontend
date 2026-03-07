import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { api } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.getProducts();
        const found = data.find(p => p.id === productId);
        if (found) setProduct(found);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  return (
    <PageTransition>
      <div className="relative h-[45vh] w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 border border-black/5">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="text-secondary font-bold text-sm">{product.rating}</span>
            </div>
          </div>

          <h1 className="text-3xl font-black mb-2">{product.name}</h1>
          <p className="text-secondary/60 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 bg-background p-2 rounded-2xl border border-black/5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-black text-xl w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-secondary/40 text-xs font-bold uppercase tracking-wider">Price</p>
              <p className="text-3xl font-black text-primary">₹{product.price * quantity}</p>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              for (let i = 0; i < quantity; i++) addToCart(product);
              navigate(-1);
            }}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-6 h-6" />
            Add to Order
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
};
