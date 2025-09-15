import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  SearchIcon, 
  FilterIcon,
  CalendarIcon,
  TagIcon,
  EyeIcon,
  EyeOffIcon,
  SaveIcon,
  XIcon,
  GiftIcon,
  PercentIcon,
  ClockIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'combo';
  discountValue: number;
  validFrom: Date;
  validUntil: Date;
  image: string;
  category: 'food' | 'drink' | 'combo' | 'special';
  isActive: boolean;
  terms: string[];
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  applicableItems?: number[];
  createdAt: Date;
  updatedAt: Date;
}

const PromotionsManagement: React.FC = () => {
  const { hasPermission } = useAuth();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState<Partial<Promotion>>({});

  const categories = [
    { id: 'all', name: 'All Promotions' },
    { id: 'food', name: 'Food' },
    { id: 'drink', name: 'Drinks' },
    { id: 'combo', name: 'Combos' },
    { id: 'special', name: 'Special Offers' }
  ];

  const discountTypes = [
    { id: 'percentage', name: 'Percentage', icon: PercentIcon },
    { id: 'fixed', name: 'Fixed Amount', icon: TagIcon },
    { id: 'combo', name: 'Combo Deal', icon: GiftIcon }
  ];

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    // setIsLoading(true); // Removed unused state
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPromotions: Promotion[] = [
        {
          id: 1,
          title: 'Weekend Family Feast',
          description: 'Enjoy our special family bundle with 2 Ayam Gepuk Klasik, 2 Ayam Gepuk Krispy, 4 rice, and 4 drinks!',
          discountType: 'combo',
          discountValue: 20,
          validFrom: new Date('2023-10-20'),
          validUntil: new Date('2023-10-22'),
          image: 'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/family-feast.jpg',
          category: 'combo',
          isActive: true,
          terms: ['Valid on weekends only', 'Minimum 4 people', 'Cannot combine with other offers'],
          minOrderAmount: 50,
          usageLimit: 100,
          usageCount: 25,
          applicableItems: [1, 2, 3, 4],
          createdAt: new Date('2023-10-15'),
          updatedAt: new Date('2023-10-20')
        },
        {
          id: 2,
          title: 'Spicy Monday Discount',
          description: 'Get 15% off on all Ayam Gepuk Krispy orders every Monday!',
          discountType: 'percentage',
          discountValue: 15,
          validFrom: new Date('2023-10-01'),
          validUntil: new Date('2023-12-31'),
          image: 'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/spicy-monday.jpg',
          category: 'food',
          isActive: true,
          terms: ['Valid on Mondays only', 'Only for Ayam Gepuk Krispy', 'Maximum discount RM10'],
          maxDiscount: 10,
          usageLimit: 200,
          usageCount: 45,
          applicableItems: [1],
          createdAt: new Date('2023-09-25'),
          updatedAt: new Date('2023-10-20')
        }
      ];
      
      setPromotions(mockPromotions);
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      // setIsLoading(false); // Removed unused state
    }
  };

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || promo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setFormData({
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      image: '',
      category: 'food',
      isActive: true,
      terms: [],
      usageCount: 0
    });
    setIsModalOpen(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData(promotion);
    setIsModalOpen(true);
  };

  const handleDeletePromotion = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setPromotions(prev => prev.filter(promo => promo.id !== id));
      } catch (error) {
        console.error('Failed to delete promotion:', error);
      }
    }
  };

  const handleSavePromotion = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingPromotion) {
        setPromotions(prev => prev.map(promo => 
          promo.id === editingPromotion.id 
            ? { ...promo, ...formData, updatedAt: new Date() }
            : promo
        ));
      } else {
        const newPromotion: Promotion = {
          ...formData as Promotion,
          id: Date.now(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setPromotions(prev => [...prev, newPromotion]);
      }
      
      setIsModalOpen(false);
      setEditingPromotion(null);
      setFormData({});
    } catch (error) {
      console.error('Failed to save promotion:', error);
    }
  };

  const toggleActive = async (id: number) => {
    try {
      setPromotions(prev => prev.map(promo => 
        promo.id === id 
          ? { ...promo, isActive: !promo.isActive, updatedAt: new Date() }
          : promo
      ));
    } catch (error) {
      console.error('Failed to toggle promotion:', error);
    }
  };

  const getStatusColor = (promo: Promotion) => {
    const now = new Date();
    if (!promo.isActive) return 'bg-gray-500';
    if (now < promo.validFrom) return 'bg-blue-500';
    if (now > promo.validUntil) return 'bg-red-500';
    return 'bg-green-500';
  };

  const getStatusText = (promo: Promotion) => {
    const now = new Date();
    if (!promo.isActive) return 'Inactive';
    if (now < promo.validFrom) return 'Upcoming';
    if (now > promo.validUntil) return 'Expired';
    return 'Active';
  };

  if (!hasPermission('promotions:manage')) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-brand-black dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-brand-black/70 dark:text-gray-300 font-body">
            You don't have permission to manage promotions.
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
              Promotions Management
            </h1>
            <p className="text-brand-black/70 dark:text-gray-300 font-body">
              Create and manage promotional offers and discounts.
            </p>
          </div>
          <motion.button
            onClick={handleAddPromotion}
            className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold flex items-center gap-2 shadow-brand hover:shadow-brand-lg transition-all duration-300 mt-4 md:mt-0"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusIcon size={20} />
            Create Promotion
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
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
              />
            </div>
            <div className="relative">
              <FilterIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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

        {/* Promotions Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredPromotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 group"
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
                layout
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-heading font-semibold text-white ${getStatusColor(promo)}`}>
                      {getStatusText(promo)}
                    </div>
                    <button
                      onClick={() => toggleActive(promo.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        promo.isActive 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {promo.isActive ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold text-brand-black dark:text-white">
                      {promo.title}
                    </h3>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {promo.discountType === 'percentage' && <PercentIcon size={16} className="text-brand-red" />}
                        {promo.discountType === 'fixed' && <TagIcon size={16} className="text-brand-red" />}
                        {promo.discountType === 'combo' && <GiftIcon size={16} className="text-brand-red" />}
                        <span className="text-lg font-heading font-bold text-brand-red">
                          {promo.discountType === 'percentage' ? `${promo.discountValue}%` : 
                           promo.discountType === 'fixed' ? `RM ${promo.discountValue}` : 
                           `${promo.discountValue}% OFF`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-brand-black/70 dark:text-gray-300 font-body mb-4 leading-relaxed">
                    {promo.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-brand-black/60 dark:text-gray-400">
                      <CalendarIcon size={16} />
                      <span>
                        {promo.validFrom.toLocaleDateString()} - {promo.validUntil.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-brand-black/60 dark:text-gray-400">
                      <ClockIcon size={16} />
                      <span>
                        Used: {promo.usageCount}/{promo.usageLimit || '∞'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEditPromotion(promo)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-heading font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <EditIcon size={16} />
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeletePromotion(promo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-heading font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TrashIcon size={16} />
                    </motion.button>
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
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                    {editingPromotion ? 'Edit Promotion' : 'Create New Promotion'}
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
                        Promotion Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                        placeholder="Enter promotion title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category || 'food'}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      >
                        {categories.filter(cat => cat.id !== 'all').map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      placeholder="Enter promotion description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Discount Type *
                      </label>
                      <select
                        value={formData.discountType || 'percentage'}
                        onChange={(e) => setFormData(prev => ({ ...prev, discountType: e.target.value as any }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      >
                        {discountTypes.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Discount Value *
                      </label>
                      <input
                        type="number"
                        value={formData.discountValue || 0}
                        onChange={(e) => setFormData(prev => ({ ...prev, discountValue: parseFloat(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Valid From *
                      </label>
                      <input
                        type="date"
                        value={formData.validFrom ? formData.validFrom.toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, validFrom: new Date(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Valid Until *
                      </label>
                      <input
                        type="date"
                        value={formData.validUntil ? formData.validUntil.toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, validUntil: new Date(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
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
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive !== false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="w-4 h-4 text-yellow-gold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-gold focus:ring-2"
                      />
                      <span className="text-sm font-body text-brand-black dark:text-white">
                        Active
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={handleSavePromotion}
                    className="flex-1 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold flex items-center justify-center gap-2 shadow-brand hover:shadow-brand-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SaveIcon size={20} />
                    {editingPromotion ? 'Update Promotion' : 'Create Promotion'}
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

export default PromotionsManagement;