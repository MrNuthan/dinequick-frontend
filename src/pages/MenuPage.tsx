import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { CategoryBar } from '../components/CategoryBar';
import { FoodCard } from '../components/FoodCard';
import { CartDrawer } from '../components/CartDrawer';
import { PageTransition } from '../components/PageTransition';
import { api } from '../services/api';
import { Product, Category } from '../types';
import { useCart } from '../context/CartContext';

export const MenuPage: React.FC = () => {
  const { tableId = '5' } = useParams<{ tableId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || String(product.category) === String(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <Navbar
        restaurantName="DineQuick Premium"
        tableNumber={tableId}
        onSearch={setSearchQuery}
      />
      
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="px-4 mt-2">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse shadow-sm border border-black/5" />
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                {selectedCategory === 'all' ? 'Popular Dishes' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-secondary/40 text-sm font-medium">{filteredProducts.length} items</span>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <FoodCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-black/5">
                  <ShoppingBag className="w-10 h-10 text-secondary/10" />
                </div>
                <p className="text-secondary/40 font-medium">No dishes found matching your search</p>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-6 bg-primary text-white px-6 py-4 rounded-full shadow-2xl shadow-primary/40 flex items-center gap-3 z-30"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
                {totalItems}
              </span>
            </div>
            <span className="font-bold">View Cart</span>
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </PageTransition>
  );
};
