import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUpIcon,
  UsersIcon,
  DollarSignIcon,
  ShoppingBagIcon,
  ClockIcon,
  DownloadIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AnalyticsData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    averageOrderValue: number;
    revenueGrowth: number;
    orderGrowth: number;
    customerGrowth: number;
    aovGrowth: number;
  };
  revenue: {
    daily: Array<{ date: string; revenue: number }>;
    monthly: Array<{ month: string; revenue: number }>;
    byOutlet: Array<{ outlet: string; revenue: number }>;
  };
  orders: {
    daily: Array<{ date: string; orders: number }>;
    byStatus: Array<{ status: string; count: number }>;
    byType: Array<{ type: string; count: number }>;
    peakHours: Array<{ hour: number; orders: number }>;
  };
  customers: {
    newCustomers: Array<{ date: string; count: number }>;
    returningCustomers: Array<{ date: string; count: number }>;
    customerSegments: Array<{
      segment: string;
      count: number;
      percentage: number;
    }>;
  };
  menu: {
    topSelling: Array<{ item: string; quantity: number; revenue: number }>;
    categories: Array<{ category: string; orders: number; revenue: number }>;
    ratings: Array<{ item: string; rating: number; reviews: number }>;
  };
}

const AnalyticsDashboard: React.FC = () => {
  const { hasPermission } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data
      const mockAnalytics: AnalyticsData = {
        overview: {
          totalRevenue: 45680.5,
          totalOrders: 1247,
          totalCustomers: 892,
          averageOrderValue: 36.65,
          revenueGrowth: 12.5,
          orderGrowth: 8.3,
          customerGrowth: 15.2,
          aovGrowth: 4.1,
        },
        revenue: {
          daily: [
            { date: '2023-10-14', revenue: 1250.0 },
            { date: '2023-10-15', revenue: 1380.5 },
            { date: '2023-10-16', revenue: 1120.75 },
            { date: '2023-10-17', revenue: 1450.25 },
            { date: '2023-10-18', revenue: 1620.0 },
            { date: '2023-10-19', revenue: 1780.5 },
            { date: '2023-10-20', revenue: 1950.25 },
          ],
          monthly: [
            { month: 'Jan', revenue: 12500 },
            { month: 'Feb', revenue: 13800 },
            { month: 'Mar', revenue: 15200 },
            { month: 'Apr', revenue: 16800 },
            { month: 'May', revenue: 18200 },
            { month: 'Jun', revenue: 19500 },
          ],
          byOutlet: [
            { outlet: 'Seremban Main', revenue: 25680.5 },
            { outlet: 'KL Branch', revenue: 20000.0 },
          ],
        },
        orders: {
          daily: [
            { date: '2023-10-14', orders: 32 },
            { date: '2023-10-15', orders: 38 },
            { date: '2023-10-16', orders: 28 },
            { date: '2023-10-17', orders: 42 },
            { date: '2023-10-18', orders: 45 },
            { date: '2023-10-19', orders: 48 },
            { date: '2023-10-20', orders: 52 },
          ],
          byStatus: [
            { status: 'Delivered', count: 856 },
            { status: 'Preparing', count: 23 },
            { status: 'Confirmed', count: 15 },
            { status: 'Cancelled', count: 8 },
          ],
          byType: [
            { type: 'Dine-in', count: 456 },
            { type: 'Takeaway', count: 523 },
            { type: 'Delivery', count: 268 },
          ],
          peakHours: [
            { hour: 12, orders: 45 },
            { hour: 13, orders: 52 },
            { hour: 14, orders: 38 },
            { hour: 18, orders: 48 },
            { hour: 19, orders: 55 },
            { hour: 20, orders: 42 },
          ],
        },
        customers: {
          newCustomers: [
            { date: '2023-10-14', count: 8 },
            { date: '2023-10-15', count: 12 },
            { date: '2023-10-16', count: 6 },
            { date: '2023-10-17', count: 15 },
            { date: '2023-10-18', count: 18 },
            { date: '2023-10-19', count: 14 },
            { date: '2023-10-20', count: 16 },
          ],
          returningCustomers: [
            { date: '2023-10-14', count: 24 },
            { date: '2023-10-15', count: 26 },
            { date: '2023-10-16', count: 22 },
            { date: '2023-10-17', count: 27 },
            { date: '2023-10-18', count: 27 },
            { date: '2023-10-19', count: 34 },
            { date: '2023-10-20', count: 36 },
          ],
          customerSegments: [
            { segment: 'New Customers', count: 234, percentage: 26.2 },
            { segment: 'Regular Customers', count: 456, percentage: 51.1 },
            { segment: 'VIP Customers', count: 202, percentage: 22.7 },
          ],
        },
        menu: {
          topSelling: [
            { item: 'Ayam Gepuk Krispy', quantity: 245, revenue: 3675.0 },
            { item: 'Ayam Gepuk Klasik', quantity: 198, revenue: 2950.2 },
            { item: 'Nasi Lemak Special', quantity: 156, revenue: 1872.0 },
            { item: 'Ayam Gepuk Extra Spicy', quantity: 134, revenue: 2010.0 },
            { item: 'Chicken Wings', quantity: 98, revenue: 1470.0 },
          ],
          categories: [
            { category: 'Ayam Krispy', orders: 456, revenue: 6840.0 },
            { category: 'Ayam Klasik', orders: 389, revenue: 5801.1 },
            { category: 'Side Dishes', orders: 234, revenue: 1170.0 },
            { category: 'Drinks', orders: 567, revenue: 1134.0 },
          ],
          ratings: [
            { item: 'Ayam Gepuk Krispy', rating: 4.8, reviews: 156 },
            { item: 'Ayam Gepuk Klasik', rating: 4.6, reviews: 134 },
            { item: 'Nasi Lemak Special', rating: 4.7, reviews: 89 },
            { item: 'Chicken Wings', rating: 4.5, reviews: 67 },
          ],
        },
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const overviewCards = [
    {
      title: 'Total Revenue',
      value: `RM ${analytics?.overview.totalRevenue.toLocaleString() || 0}`,
      change: analytics?.overview.revenueGrowth || 0,
      icon: DollarSignIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Total Orders',
      value: analytics?.overview.totalOrders.toLocaleString() || 0,
      change: analytics?.overview.orderGrowth || 0,
      icon: ShoppingBagIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Total Customers',
      value: analytics?.overview.totalCustomers.toLocaleString() || 0,
      change: analytics?.overview.customerGrowth || 0,
      icon: UsersIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'Avg Order Value',
      value: `RM ${analytics?.overview.averageOrderValue.toFixed(2) || 0}`,
      change: analytics?.overview.aovGrowth || 0,
      icon: TrendingUpIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
  ];

  const periods = [
    { id: '7d', name: 'Last 7 Days' },
    { id: '30d', name: 'Last 30 Days' },
    { id: '90d', name: 'Last 90 Days' },
    { id: '1y', name: 'Last Year' },
  ];

  const metrics = [
    { id: 'revenue', name: 'Revenue' },
    { id: 'orders', name: 'Orders' },
    { id: 'customers', name: 'Customers' },
    { id: 'menu', name: 'Menu Performance' },
  ];

  if (!hasPermission('analytics:view')) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-brand-black dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-brand-black/70 dark:text-gray-300 font-body">
            You don't have permission to view analytics.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-yellow-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-black dark:text-white font-heading">
            Loading Analytics...
          </p>
        </motion.div>
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
              Analytics Dashboard
            </h1>
            <p className="text-brand-black/70 dark:text-gray-300 font-body">
              Track your restaurant's performance and growth.
            </p>
          </div>
          <motion.button
            className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold flex items-center gap-2 shadow-brand hover:shadow-brand-lg transition-all duration-300 mt-4 md:mt-0"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <DownloadIcon size={20} />
            Export Report
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
            <div className="flex-1">
              <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                Time Period
              </label>
              <div className="flex gap-2">
                {periods.map(period => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-4 py-2 rounded-xl font-heading font-semibold transition-all duration-300 ${
                      selectedPeriod === period.id
                        ? 'bg-brand-red text-white shadow-brand'
                        : 'bg-gray-100 dark:bg-gray-700 text-brand-black dark:text-white hover:bg-yellow-gold/20'
                    }`}
                  >
                    {period.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                Metric Focus
              </label>
              <div className="flex gap-2">
                {metrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`px-4 py-2 rounded-xl font-heading font-semibold transition-all duration-300 ${
                      selectedMetric === metric.id
                        ? 'bg-yellow-gold text-brand-black shadow-brand'
                        : 'bg-gray-100 dark:bg-gray-700 text-brand-black dark:text-white hover:bg-yellow-gold/20'
                    }`}
                  >
                    {metric.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {overviewCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <card.icon size={24} className={card.color} />
                </div>
                <span
                  className={`text-sm font-heading font-semibold ${
                    card.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {card.change >= 0 ? '+' : ''}
                  {card.change}%
                </span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-brand-black dark:text-white mb-1">
                {card.value}
              </h3>
              <p className="text-brand-black/70 dark:text-gray-300 font-body text-sm">
                {card.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-heading font-bold text-brand-black dark:text-white mb-4">
              Revenue Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics?.revenue.daily.map((day, index) => (
                <motion.div
                  key={day.date}
                  className="bg-gradient-to-t from-brand-red to-yellow-gold rounded-t-lg flex-1 relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.revenue / 2000) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    RM {day.revenue.toFixed(0)}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-brand-black/60 dark:text-gray-400 font-body">
              {analytics?.revenue.daily.map(day => (
                <span key={day.date}>
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Top Selling Items */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-heading font-bold text-brand-black dark:text-white mb-4">
              Top Selling Items
            </h3>
            <div className="space-y-4">
              {analytics?.menu.topSelling.map((item, index) => (
                <motion.div
                  key={item.item}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brand-black dark:text-white">
                        {item.item}
                      </p>
                      <p className="text-sm text-brand-black/70 dark:text-gray-300 font-body">
                        {item.quantity} sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-brand-red">
                      RM {item.revenue.toFixed(2)}
                    </p>
                    <p className="text-xs text-brand-black/60 dark:text-gray-400 font-body">
                      {item.quantity} units
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Order Status Distribution */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-heading font-bold text-brand-black dark:text-white mb-4">
              Order Status Distribution
            </h3>
            <div className="space-y-3">
              {analytics?.orders.byStatus.map((status, index) => (
                <motion.div
                  key={status.status}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        status.status === 'Delivered'
                          ? 'bg-green-500'
                          : status.status === 'Preparing'
                            ? 'bg-yellow-500'
                            : status.status === 'Confirmed'
                              ? 'bg-blue-500'
                              : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="font-body text-brand-black dark:text-white">
                      {status.status}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-brand-black dark:text-white">
                    {status.count}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Peak Hours */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-lg font-heading font-bold text-brand-black dark:text-white mb-4">
              Peak Hours
            </h3>
            <div className="space-y-3">
              {analytics?.orders.peakHours.map((hour, index) => (
                <motion.div
                  key={hour.hour}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <ClockIcon size={16} className="text-brand-red" />
                    <span className="font-body text-brand-black dark:text-white">
                      {hour.hour}:00
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-brand-red to-yellow-gold h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(hour.orders / 60) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                      ></motion.div>
                    </div>
                    <span className="font-heading font-bold text-brand-black dark:text-white text-sm">
                      {hour.orders}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
