import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, MessageSquare, Table, Smartphone, QrCode, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_KEY_ID = 'rzp_test_SNS4487DMuUaXL';

export const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [instructions, setInstructions] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    setPaymentError('');
    try {
      // Step 1: Place the order on the backend
      const { data: orderData } = await api.placeOrder({
        items: cart,
        total: totalPrice,
        tableNumber: '5',
        specialInstructions: instructions
      });

      // Extract numeric order ID from "ORD1" format
      const numericOrderId = parseInt(orderData.id.replace('ORD', ''), 10);

      // Step 2: Create a Razorpay order via our backend
      const { data: paymentData } = await api.createPaymentOrder(numericOrderId);

      // Step 3: Open Razorpay checkout popup
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: totalPrice * 100, // amount in paise
        currency: 'INR',
        name: 'DineQuick Premium',
        description: `Order #${orderData.id}`,
        order_id: paymentData.razorpay_order_id,
        handler: async (response: any) => {
          try {
            // Step 4: Verify the payment on our backend
            await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Step 5: Payment successful — clear cart and redirect
            clearCart();
            navigate(`/order-status/${orderData.id}`);
          } catch (verifyErr) {
            console.error('Payment verification failed:', verifyErr);
            setPaymentError('Payment verification failed. Please contact staff.');
            setIsPlacing(false);
          }
        },
        prefill: {
          contact: '',
          email: '',
        },
        theme: {
          color: '#f97316',
        },
        modal: {
          ondismiss: () => {
            setIsPlacing(false);
            setPaymentError('Payment was cancelled. Your order has been saved — you can pay at the counter.');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response.error);
        setPaymentError(`Payment failed: ${response.error.description}`);
        setIsPlacing(false);
      });
      rzp.open();
    } catch (error) {
      console.error('Error placing order:', error);
      setPaymentError('Something went wrong. Please try again.');
      setIsPlacing(false);
    }
  };

  return (
    <PageTransition>
      <div className="bg-white px-4 py-6 sticky top-0 z-20 shadow-sm border-b border-black/5 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-background rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>

      <div className="p-4 space-y-6 pb-40">
        {/* Table Info */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Table className="w-6 h-6" />
          </div>
          <div>
            <p className="text-secondary/40 text-xs font-bold uppercase tracking-wider">Dining Table</p>
            <p className="font-bold text-lg">Table Number 05</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-background px-2 py-1 rounded text-xs font-bold text-secondary/60">x{item.quantity}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-bold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-black/5 flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-2xl font-black text-primary">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Special Instructions</h2>
          </div>
          <textarea
            placeholder="E.g. No onions, extra spicy, etc."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full bg-background border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[100px] resize-none"
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Payment Method</h2>
          </div>
          <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="font-bold">Razorpay Secure Payment</span>
            </div>
            <div className="flex items-center gap-4 text-secondary/50 text-xs">
              <div className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>UPI</span>
              </div>
              <div className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Code</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cards</span>
              </div>
              <div className="flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5" />
                <span>Wallets</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-secondary/40 mt-3 text-center">
            Secured by Razorpay • UPI, Cards, Wallets & Net Banking
          </p>
        </div>

        {/* Payment Error */}
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium"
          >
            {paymentError}
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-black/5 z-30">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePlaceOrder}
          disabled={isPlacing || cart.length === 0}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPlacing ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            `Pay ₹${totalPrice} with Razorpay`
          )}
        </motion.button>
      </div>
    </PageTransition>
  );
};
