import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { MenuPage } from './pages/MenuPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderStatusPage } from './pages/OrderStatusPage';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Navigate to="/table/5" replace />} />
            <Route path="/table/:tableId" element={<MenuPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </CartProvider>
  );
}
