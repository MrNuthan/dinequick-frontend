import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (id: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-4 px-4 no-scrollbar sticky top-16 bg-background z-10">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
            selectedCategory === category.id
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'bg-white text-secondary/60 border border-black/5'
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span className="font-medium text-sm">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};
