import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, MenuItem } from '../data/menuData';
import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  SearchIcon,
  FilterIcon,
  StarIcon,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
const categories = [
  {
    id: 'all',
    name: 'All Items',
  },
  {
    id: 'krispy',
    name: 'Ayam Krispy',
  },
  {
    id: 'klasik',
    name: 'Ayam Klasik',
  },
  {
    id: 'side',
    name: 'Side Dishes',
  },
  {
    id: 'drink',
    name: 'Drinks',
  },
];
const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [quantities, setQuantities] = useState<{
    [key: number]: number;
  }>({});
  const { addToCart } = useCart();

  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeCategory, searchTerm, sortBy]);
  const handleQuantityChange = (id: number, change: number) => {
    setQuantities(prev => {
      const currentQuantity = prev[id] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      return {
        ...prev,
        [id]: newQuantity,
      };
    });
  };
  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 0;
    if (quantity > 0) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        image: item.image,
        category: item.category,
      });
      // Reset quantity after adding to cart
      setQuantities(prev => ({
        ...prev,
        [item.id]: 0,
      }));
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 font-body">
      <div className="container mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-heading font-bold text-brand-black text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Our Menu
        </motion.h1>
        <motion.p
          className="text-center text-brand-black/80 mb-8 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Explore our delicious selection of authentic Indonesian fried chicken
          and side dishes.
        </motion.p>

        {/* Search and Filter Controls */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-brand-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <SearchIcon
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <FilterIcon
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body appearance-none bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </motion.div>
        {/* Category Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-2xl font-heading font-semibold transition-all duration-300 ${activeCategory === category.id ? 'bg-brand-red text-white shadow-brand-lg' : 'bg-white text-brand-black hover:bg-yellow-gold/20 hover:text-brand-red shadow-brand'}`}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        {/* Menu Items Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
                layout
              >
                <motion.div
                  className="h-48 overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <motion.h3
                        className="text-xl font-heading font-bold text-brand-black mb-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      >
                        {item.name}
                      </motion.h3>
                      {item.popular && (
                        <motion.div
                          className="flex items-center gap-1 mb-2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.3 + index * 0.1,
                          }}
                        >
                          <StarIcon
                            size={16}
                            className="text-yellow-gold fill-current"
                          />
                          <span className="text-sm font-body font-medium text-yellow-gold">
                            Popular
                          </span>
                        </motion.div>
                      )}
                    </div>
                    <motion.span
                      className="bg-gradient-to-r from-yellow-gold to-yellow-400 text-brand-black font-heading font-bold px-4 py-2 rounded-xl shadow-brand"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      RM {item.price.toFixed(2)}
                    </motion.span>
                  </div>
                  <motion.p
                    className="text-brand-black/70 mb-4 font-body leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <motion.button
                        className="px-3 py-1 text-gray-500 hover:text-red-600"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={!quantities[item.id]}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MinusIcon size={16} />
                      </motion.button>
                      <span className="px-3 py-1 border-l border-r border-gray-300 min-w-[40px] text-center">
                        {quantities[item.id] || 0}
                      </span>
                      <motion.button
                        className="px-3 py-1 text-gray-500 hover:text-red-600"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PlusIcon size={16} />
                      </motion.button>
                    </div>
                    <motion.button
                      className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${quantities[item.id] ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                      onClick={() => handleAddToCart(item)}
                      disabled={!quantities[item.id]}
                      whileHover={
                        quantities[item.id] ? { scale: 1.05, y: -2 } : {}
                      }
                      whileTap={quantities[item.id] ? { scale: 0.95 } : {}}
                    >
                      <ShoppingCartIcon size={18} className="mr-1" />
                      Add to Cart
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {filteredItems.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg">
                No items found in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default MenuPage;
