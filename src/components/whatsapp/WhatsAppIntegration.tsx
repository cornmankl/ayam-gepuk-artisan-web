import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircleIcon,
  XIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ShoppingBagIcon,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface WhatsAppIntegrationProps {
  variant?: 'floating' | 'inline' | 'modal';
  phoneNumber?: string;
  message?: string;
  showOrderSummary?: boolean;
  showLocation?: boolean;
  showHours?: boolean;
}

const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({
  variant = 'floating',
  phoneNumber = '60182442017',
  message = '',
  showOrderSummary = true,
  showLocation = true,
  showHours = true,
}) => {
  const { items, totalPrice, totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage] = useState('');

  const generateOrderSummary = () => {
    if (!showOrderSummary || items.length === 0) return '';

    let summary = '🍗 *AYAM GEPUK ARTISAN ORDER*\n\n';
    summary += '📋 *Order Summary:*\n';

    items.forEach((item, index) => {
      summary += `${index + 1}. ${item.name} x${item.quantity} - RM ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    summary += `\n💰 *Total: RM ${totalPrice.toFixed(2)}*\n`;
    summary += `📦 *Total Items: ${totalItems}*\n\n`;

    return summary;
  };

  const generateLocationInfo = () => {
    if (!showLocation) return '';

    return `📍 *Location:*\n123 Jalan Seremban, Seremban, Negeri Sembilan\n\n`;
  };

  const generateHoursInfo = () => {
    if (!showHours) return '';

    return `🕒 *Opening Hours:*\nMonday - Sunday: 10:00 AM - 10:00 PM\n\n`;
  };

  const generateWhatsAppMessage = () => {
    let fullMessage = message || 'Hi! I would like to place an order.\n\n';

    if (showOrderSummary && items.length > 0) {
      fullMessage += generateOrderSummary();
    }

    if (showLocation) {
      fullMessage += generateLocationInfo();
    }

    if (showHours) {
      fullMessage += generateHoursInfo();
    }

    if (customMessage) {
      fullMessage += `💬 *Additional Message:*\n${customMessage}\n\n`;
    }

    fullMessage += 'Thank you! 🙏';

    return encodeURIComponent(fullMessage);
  };

  const handleWhatsAppClick = () => {
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  if (variant === 'inline') {
    return (
      <div className="space-y-4">
        <motion.button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-heading font-semibold flex items-center justify-center gap-3 shadow-brand hover:shadow-brand-lg transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircleIcon size={24} />
          Order via WhatsApp
        </motion.button>

        <motion.button
          onClick={handleCallClick}
          className="w-full bg-brand-red hover:bg-red-700 text-white px-6 py-4 rounded-xl font-heading font-semibold flex items-center justify-center gap-3 shadow-brand hover:shadow-brand-lg transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <PhoneIcon size={24} />
          Call Us Now
        </motion.button>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                  Contact Us
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-heading font-semibold flex items-center justify-center gap-3 shadow-brand hover:shadow-brand-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircleIcon size={24} />
                  Order via WhatsApp
                </motion.button>

                <motion.button
                  onClick={handleCallClick}
                  className="w-full bg-brand-red hover:bg-red-700 text-white px-6 py-4 rounded-xl font-heading font-semibold flex items-center justify-center gap-3 shadow-brand hover:shadow-brand-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PhoneIcon size={24} />
                  Call Us Now
                </motion.button>

                {showLocation && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <MapPinIcon size={20} className="text-brand-red" />
                    <div>
                      <p className="font-heading font-semibold text-brand-black dark:text-white">
                        Visit Us
                      </p>
                      <p className="text-sm text-brand-black/70 dark:text-gray-300 font-body">
                        123 Jalan Seremban, Seremban, Negeri Sembilan
                      </p>
                    </div>
                  </div>
                )}

                {showHours && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <ClockIcon size={20} className="text-brand-red" />
                    <div>
                      <p className="font-heading font-semibold text-brand-black dark:text-white">
                        Opening Hours
                      </p>
                      <p className="text-sm text-brand-black/70 dark:text-gray-300 font-body">
                        Monday - Sunday: 10:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Floating variant (default)
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-brand-lg hover:shadow-brand-xl transition-all duration-300 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="WhatsApp Support"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <XIcon size={24} /> : <MessageCircleIcon size={24} />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-brand-xl p-6 min-w-[300px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-heading font-bold text-brand-black dark:text-white mb-4">
              How can we help you?
            </h3>

            <div className="space-y-3">
              <motion.button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-heading font-semibold flex items-center gap-3 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircleIcon size={20} />
                Order via WhatsApp
              </motion.button>

              <motion.button
                onClick={handleCallClick}
                className="w-full bg-brand-red hover:bg-red-700 text-white px-4 py-3 rounded-xl font-heading font-semibold flex items-center gap-3 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PhoneIcon size={20} />
                Call Us
              </motion.button>

              {showOrderSummary && items.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBagIcon size={16} className="text-brand-red" />
                    <span className="text-sm font-heading font-semibold text-brand-black dark:text-white">
                      Cart Summary
                    </span>
                  </div>
                  <p className="text-xs text-brand-black/70 dark:text-gray-300 font-body">
                    {totalItems} items • RM {totalPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppIntegration;
