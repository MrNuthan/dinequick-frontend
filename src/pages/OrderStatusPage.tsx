import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ChefHat, Utensils, Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { OrderStatus } from '../types';

const STATUS_STEPS: { status: OrderStatus; label: string; icon: any; description: string }[] = [
  {
    status: 'received',
    label: 'Order Received',
    icon: Clock,
    description: 'We have received your order and it will be processed soon.'
  },
  {
    status: 'preparing',
    label: 'Preparing',
    icon: ChefHat,
    description: 'Our chefs are working their magic on your delicious meal.'
  },
  {
    status: 'ready',
    label: 'Ready to Serve',
    icon: Utensils,
    description: 'Your food is ready and will be at your table any moment.'
  },
  {
    status: 'served',
    label: 'Served',
    icon: CheckCircle2,
    description: 'Enjoy your meal! Let us know if you need anything else.'
  }
];

export const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('received');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate status updates
    const timer1 = setTimeout(() => setCurrentStatus('preparing'), 5000);
    const timer2 = setTimeout(() => setCurrentStatus('ready'), 15000);
    const timer3 = setTimeout(() => setCurrentStatus('served'), 25000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.status === currentStatus);

  return (
    <PageTransition>
      <div className="bg-white px-4 py-8 text-center border-b border-black/5">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black mb-1">Order Confirmed!</h1>
        <p className="text-secondary/40 font-medium">Order ID: #{orderId}</p>
      </div>

      <div className="p-6 space-y-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-black/5" />

          <div className="space-y-10">
            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isActive = index === currentStepIndex;
              const Icon = step.icon;

              return (
                <div key={step.status} className="flex gap-6 relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 ${isCompleted ? 'bg-accent text-white' :
                      isActive ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' :
                        'bg-white text-secondary/20 border border-black/5'
                    }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-grow pt-1">
                    <h3 className={`font-bold text-lg ${isActive ? 'text-secondary' : 'text-secondary/40'}`}>
                      {step.label}
                    </h3>
                    <p className={`text-sm mt-1 leading-relaxed ${isActive ? 'text-secondary/60' : 'text-secondary/20'}`}>
                      {step.description}
                    </p>

                    {isActive && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="h-1 bg-primary/10 mt-4 rounded-full overflow-hidden"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          className="h-full w-1/3 bg-primary"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 mt-8">
          <h2 className="font-bold mb-4">Need help?</h2>
          <button className="w-full py-4 px-6 bg-background rounded-2xl flex items-center justify-between font-bold group">
            <span className="text-secondary/60">Call a Waiter</span>
            <ChevronRight className="w-5 h-5 text-secondary/20 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-black/5 z-30">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/table/5')}
          className="w-full bg-secondary text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Menu
        </motion.button>
      </div>
    </PageTransition>
  );
};
