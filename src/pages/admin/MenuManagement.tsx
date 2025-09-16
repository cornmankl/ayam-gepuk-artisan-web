import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  FilterIcon,
  StarIcon,
  EyeIcon,
  EyeOffIcon,
  SaveIcon,
  XIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MenuItem } from '../../types/database';

const MenuManagement: React.FC = () => {
  const { hasPermission } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // const [isLoading, setIsLoading] = useState(true); // Removed unused state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({});

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'krispy', name: 'Ayam Krispy' },
    { id: 'klasik', name: 'Ayam Klasik' },
    { id: 'side', name: 'Side Dishes' },
    { id: 'drink', name: 'Drinks' },
  ];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    // setIsLoading(true); // Removed unused state
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockItems: MenuItem[] = [
        {
          id: 1,
          name: 'Ayam Gepuk Krispy',
          description: 'Crispy smashed fried chicken with spicy sambal',
          price: 15.9,
          category: 'krispy',
          image:
            'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/ayam-krispy.jpg',
          popular: true,
          available: true,
          ingredients: ['Chicken', 'Spices', 'Sambal', 'Rice'],
          allergens: ['Gluten'],
          nutritionInfo: { calories: 450, protein: 35, carbs: 25, fat: 20 },
          preparationTime: 15,
          spiceLevel: 4,
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2023-10-20'),
        },
        {
          id: 2,
          name: 'Ayam Gepuk Klasik',
          description: 'Traditional smashed fried chicken with mild spices',
          price: 14.9,
          category: 'klasik',
          image:
            'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/ayam-klasik.jpg',
          popular: true,
          available: true,
          ingredients: ['Chicken', 'Traditional Spices', 'Sambal', 'Rice'],
          allergens: ['Gluten'],
          nutritionInfo: { calories: 420, protein: 32, carbs: 28, fat: 18 },
          preparationTime: 12,
          spiceLevel: 2,
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2023-10-20'),
        },
      ];

      setMenuItems(mockItems);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    } finally {
      // setIsLoading(false); // Removed unused state
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'krispy',
      image: '',
      popular: false,
      available: true,
      ingredients: [],
      allergens: [],
      nutritionInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      preparationTime: 10,
      spiceLevel: 1,
    });
    setIsModalOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setMenuItems(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  const handleSaveItem = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingItem) {
        // Update existing item
        setMenuItems(prev =>
          prev.map(item =>
            item.id === editingItem.id
              ? { ...item, ...formData, updatedAt: new Date() }
              : item
          )
        );
      } else {
        // Add new item
        const newItem: MenuItem = {
          ...(formData as MenuItem),
          id: Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setMenuItems(prev => [...prev, newItem]);
      }

      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  const toggleAvailability = async (id: number) => {
    try {
      setMenuItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, available: !item.available, updatedAt: new Date() }
            : item
        )
      );
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

  if (!hasPermission('menu:manage')) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-brand-black dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-brand-black/70 dark:text-gray-300 font-body">
            You don't have permission to manage menu items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-brand-black dark:text-white mb-2">
              Menu Management
            </h1>
            <p className="text-brand-black/70 dark:text-gray-300 font-body">
              Manage your menu items, prices, and availability.
            </p>
          </div>
          <motion.button
            onClick={handleAddItem}
            className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold flex items-center gap-2 shadow-brand hover:shadow-brand-lg transition-all duration-300 mt-4 md:mt-0"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusIcon size={20} />
            Add New Item
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
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
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
              />
            </div>
            <div className="relative">
              <FilterIcon
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body appearance-none bg-white dark:bg-gray-700 text-brand-black dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 group"
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
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.popular && (
                      <div className="bg-yellow-gold text-brand-black px-2 py-1 rounded-full text-xs font-heading font-semibold flex items-center gap-1">
                        <StarIcon size={12} />
                        Popular
                      </div>
                    )}
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        item.available
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {item.available ? (
                        <EyeIcon size={16} />
                      ) : (
                        <EyeOffIcon size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold text-brand-black dark:text-white">
                      {item.name}
                    </h3>
                    <span className="bg-gradient-to-r from-yellow-gold to-yellow-400 text-brand-black font-heading font-bold px-3 py-1 rounded-xl shadow-brand">
                      RM {item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-brand-black/70 dark:text-gray-300 font-body mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-body text-brand-black/60 dark:text-gray-400">
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
                      </span>
                      <span className="text-sm font-body text-brand-black/60 dark:text-gray-400">
                        • {item.preparationTime} min
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEditItem(item)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <EditIcon size={16} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <TrashIcon size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                    {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300"
                  >
                    <XIcon size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Item Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                        placeholder="Enter item name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Price (RM) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price || 0}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            price: parseFloat(e.target.value),
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      placeholder="Enter item description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category || 'krispy'}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            category: e.target.value as any,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      >
                        {categories
                          .filter(cat => cat.id !== 'all')
                          .map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Preparation Time (minutes)
                      </label>
                      <input
                        type="number"
                        value={formData.preparationTime || 10}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            preparationTime: parseInt(e.target.value),
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image || ''}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.popular || false}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            popular: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-yellow-gold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-gold focus:ring-2"
                      />
                      <span className="text-sm font-body text-brand-black dark:text-white">
                        Mark as Popular
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.available !== false}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            available: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-yellow-gold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-gold focus:ring-2"
                      />
                      <span className="text-sm font-body text-brand-black dark:text-white">
                        Available
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={handleSaveItem}
                    className="flex-1 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold flex items-center justify-center gap-2 shadow-brand hover:shadow-brand-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SaveIcon size={20} />
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </motion.button>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-brand-black dark:text-white rounded-xl font-heading font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuManagement;
