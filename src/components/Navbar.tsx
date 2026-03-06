import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface NavbarProps {
  restaurantName: string;
  tableNumber: string;
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ restaurantName, tableNumber, onSearch }) => {
  return (
    <nav className="bg-white px-4 pt-4 pb-2 sticky top-0 z-20 shadow-sm border-b border-black/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-black text-secondary tracking-tight">{restaurantName}</h1>
          <div className="flex items-center gap-1 text-primary">
            <MapPin className="w-3 h-3" />
            <span className="text-xs font-bold uppercase tracking-wider">Table {tableNumber}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">DQ</span>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40" />
        <input
          type="text"
          placeholder="Search for delicious food..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-background border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
        />
      </div>
    </nav>
  );
};
