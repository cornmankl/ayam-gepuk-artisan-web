import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ClockIcon, TagIcon, GiftIcon, CalendarIcon } from 'lucide-react';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  category: 'food' | 'drink' | 'combo' | 'special';
  isActive: boolean;
  terms: string[];
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Weekend Special",
    description: "Get 20% off on all Ayam Gepuk orders every weekend!",
    discount: "20% OFF",
    validUntil: "2024-12-31",
    image: "/menu/ayam-gepuk-krispy.jpg",
    category: "food",
    isActive: true,
    terms: ["Valid on weekends only", "Minimum order RM30", "Not combinable with other offers"]
  },
  {
    id: 2,
    title: "Student Discount",
    description: "Show your student ID and get 15% off your order!",
    discount: "15% OFF",
    validUntil: "2024-12-31",
    image: "/menu/ayam-gepuk-klasik.jpg",
    category: "special",
    isActive: true,
    terms: ["Valid student ID required", "All items included", "One use per day"]
  },
  {
    id: 3,
    title: "Combo Deal",
    description: "Buy 2 Ayam Gepuk + 2 Drinks and save RM10!",
    discount: "RM10 OFF",
    validUntil: "2024-12-31",
    image: "/menu/combo-deal.jpg",
    category: "combo",
    isActive: true,
    terms: ["Must include 2 main items", "Must include 2 drinks", "Cannot be combined with other offers"]
  },
  {
    id: 4,
    title: "Early Bird Special",
    description: "Order before 11 AM and get 10% off!",
    discount: "10% OFF",
    validUntil: "2024-12-31",
    image: "/menu/early-bird.jpg",
    category: "special",
    isActive: true,
    terms: ["Valid before 11 AM", "All items included", "Dine-in and takeaway"]
  }
];

const categories = [
  { id: 'all', name: 'All Promotions', icon: TagIcon },
  { id: 'food', name: 'Food Deals', icon: GiftIcon },
  { id: 'drink', name: 'Drink Deals', icon: GiftIcon },
  { id: 'combo', name: 'Combo Deals', icon: GiftIcon },
  { id: 'special', name: 'Special Offers', icon: StarIcon }
];

const PromotionsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const filteredPromotions = activeCategory === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'from-brand-red to-red-600';
      case 'drink': return 'from-blue-500 to-blue-600';
      case 'combo': return 'from-yellow-gold to-yellow-500';
      case 'special': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 font-body">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold text-brand-black mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Special Promotions
          </motion.h1>
          <motion.p
            className="text-lg text-brand-black/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Don't miss out on our amazing deals and special offers!
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-heading font-semibold transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-brand-red text-white shadow-brand-lg' 
                  : 'bg-white text-brand-black hover:bg-yellow-gold/20 hover:text-brand-red shadow-brand'
              }`}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon size={20} />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Promotions Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredPromotions.map((promotion, index) => (
              <motion.div
                key={promotion.id}
                className="bg-white rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                onClick={() => setSelectedPromotion(promotion)}
                layout
              >
                {/* Image */}
                <motion.div
                  className="h-48 overflow-hidden relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${getCategoryColor(promotion.category)} text-white px-3 py-1 rounded-full text-sm font-heading font-bold`}>
                    {promotion.discount}
                  </div>
                  {promotion.isActive && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-heading font-bold flex items-center gap-1">
                      <ClockIcon size={14} />
                      Active
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-heading font-bold text-brand-black mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    {promotion.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-brand-black/70 mb-4 font-body leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    {promotion.description}
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-between text-sm text-brand-black/60"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={16} />
                      <span>Valid until {new Date(promotion.validUntil).toLocaleDateString()}</span>
                    </div>
                    <motion.button
                      className="text-brand-red font-heading font-semibold hover:text-brand-black transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredPromotions.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <GiftIcon size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg font-body">
                No promotions found in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Promotion Modal */}
      <AnimatePresence>
        {selectedPromotion && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPromotion(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-2">
                  {selectedPromotion.title}
                </h3>
                <div className={`inline-block bg-gradient-to-r ${getCategoryColor(selectedPromotion.category)} text-white px-4 py-2 rounded-xl text-lg font-heading font-bold`}>
                  {selectedPromotion.discount}
                </div>
              </div>

              <p className="text-brand-black/70 mb-6 font-body leading-relaxed">
                {selectedPromotion.description}
              </p>

              <div className="mb-6">
                <h4 className="font-heading font-semibold text-brand-black mb-3">Terms & Conditions:</h4>
                <ul className="space-y-2">
                  {selectedPromotion.terms.map((term, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-brand-black/70 font-body">
                      <span className="text-brand-red mt-1">•</span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <motion.button
                  className="flex-1 bg-brand-red text-white py-3 rounded-xl font-heading font-semibold hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Use This Offer
                </motion.button>
                <motion.button
                  className="px-6 py-3 border border-gray-300 text-brand-black rounded-xl font-heading font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedPromotion(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PromotionsPage;
