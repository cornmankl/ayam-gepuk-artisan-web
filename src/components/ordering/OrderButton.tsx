import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, PhoneIcon, MessageCircleIcon, XIcon } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/index';

const OrderButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const orderOptions = [
    {
      icon: ShoppingCartIcon,
      title: 'Online Order',
      description: 'Order through our website',
      action: () => window.location.href = '/menu',
      color: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-white'
    },
    {
      icon: PhoneIcon,
      title: 'Call & Order',
      description: `Call ${BUSINESS_INFO.PHONE}`,
      action: () => window.location.href = `tel:${BUSINESS_INFO.PHONE}`,
      color: 'bg-green-600 hover:bg-green-700',
      textColor: 'text-white'
    },
    {
      icon: MessageCircleIcon,
      title: 'WhatsApp',
      description: 'Order via WhatsApp',
      action: () => window.location.href = BUSINESS_INFO.SOCIAL_MEDIA.WHATSAPP,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    }
  ];

  return (
    <>
      {/* Floating Order Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 md:hidden"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ShoppingCartIcon size={24} />
      </motion.button>

      {/* Desktop Order Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <motion.button
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <ShoppingCartIcon size={20} />
          <span className="font-medium">Order Now</span>
        </motion.button>
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">How would you like to order?</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XIcon size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {orderOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full ${option.color} ${option.textColor} p-4 rounded-xl transition-all duration-300 flex items-center gap-4 hover:scale-105`}
                    onClick={() => {
                      option.action();
                      setIsOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <option.icon size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-lg">{option.title}</h4>
                      <p className="text-sm opacity-90">{option.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Quick Tip:</strong> Online orders get 10% off your first order!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderButton;