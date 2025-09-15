import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3Icon,
    UsersIcon,
    ShoppingBagIcon,
    DollarSignIcon,
    TrendingUpIcon,
    MapPinIcon,
    ChefHatIcon,
    PackageIcon,
    MessageSquareIcon,
    SettingsIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardStats {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    averageOrderValue: number;
    ordersToday: number;
    revenueToday: number;
    newCustomersToday: number;
    topSellingItems: Array<{
        id: number;
        name: string;
        quantity: number;
        revenue: number;
    }>;
    recentOrders: Array<{
        id: number;
        customerName: string;
        total: number;
        status: string;
        time: string;
    }>;
}

const AdminDashboard: React.FC = () => {
    const { user, hasPermission } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    useEffect(() => {
        // Simulate API call to fetch dashboard data
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock data
                const mockStats: DashboardStats = {
                    totalOrders: 1247,
                    totalRevenue: 45680.50,
                    totalCustomers: 892,
                    averageOrderValue: 36.65,
                    ordersToday: 23,
                    revenueToday: 1245.80,
                    newCustomersToday: 8,
                    topSellingItems: [
                        { id: 1, name: 'Ayam Gepuk Krispy', quantity: 45, revenue: 1350.00 },
                        { id: 2, name: 'Ayam Gepuk Klasik', quantity: 38, revenue: 1140.00 },
                        { id: 3, name: 'Nasi Lemak Special', quantity: 32, revenue: 960.00 },
                    ],
                    recentOrders: [
                        { id: 1001, customerName: 'Ahmad Rahman', total: 45.50, status: 'delivered', time: '2 min ago' },
                        { id: 1002, customerName: 'Siti Aminah', total: 32.00, status: 'preparing', time: '5 min ago' },
                        { id: 1003, customerName: 'Muhammad Ali', total: 28.50, status: 'confirmed', time: '8 min ago' },
                    ]
                };

                setStats(mockStats);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedPeriod]);

    const statCards = [
        {
            title: 'Total Orders',
            value: stats?.totalOrders || 0,
            change: '+12%',
            changeType: 'positive' as const,
            icon: ShoppingBagIcon,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20'
        },
        {
            title: 'Total Revenue',
            value: `RM ${stats?.totalRevenue.toLocaleString() || 0}`,
            change: '+8%',
            changeType: 'positive' as const,
            icon: DollarSignIcon,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900/20'
        },
        {
            title: 'Total Customers',
            value: stats?.totalCustomers || 0,
            change: '+15%',
            changeType: 'positive' as const,
            icon: UsersIcon,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20'
        },
        {
            title: 'Avg Order Value',
            value: `RM ${stats?.averageOrderValue.toFixed(2) || 0}`,
            change: '+5%',
            changeType: 'positive' as const,
            icon: TrendingUpIcon,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20'
        }
    ];

    const quickActions = [
        { name: 'Manage Menu', icon: ChefHatIcon, path: '/admin/menu', permission: 'menu:manage' },
        { name: 'View Orders', icon: PackageIcon, path: '/admin/orders', permission: 'orders:view' },
        { name: 'Customer Support', icon: MessageSquareIcon, path: '/admin/support', permission: 'support:manage' },
        { name: 'Analytics', icon: BarChart3Icon, path: '/admin/analytics', permission: 'analytics:view' },
        { name: 'Outlets', icon: MapPinIcon, path: '/admin/outlets', permission: 'outlets:manage' },
        { name: 'Settings', icon: SettingsIcon, path: '/admin/settings', permission: 'settings:manage' }
    ];

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
                    <p className="text-brand-black dark:text-white font-heading">Loading Dashboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl font-heading font-bold text-brand-black dark:text-white mb-2">
                        Welcome back, {user?.firstName}!
                    </h1>
                    <p className="text-brand-black/70 dark:text-gray-300 font-body">
                        Here's what's happening with your restaurant today.
                    </p>
                </motion.div>

                {/* Period Selector */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="flex gap-2">
                        {['today', 'week', 'month', 'year'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-4 py-2 rounded-xl font-heading font-semibold transition-all duration-300 ${selectedPeriod === period
                                        ? 'bg-brand-red text-white shadow-brand'
                                        : 'bg-white dark:bg-gray-800 text-brand-black dark:text-white hover:bg-yellow-gold/20'
                                    }`}
                            >
                                {period.charAt(0).toUpperCase() + period.slice(1)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {statCards.map((card, index) => (
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
                                <span className={`text-sm font-heading font-semibold ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {card.change}
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

                {/* Quick Actions */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-xl font-heading font-bold text-brand-black dark:text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {quickActions.map((action, index) => {
                            if (!hasPermission(action.permission)) return null;

                            return (
                                <motion.button
                                    key={action.name}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 text-center group"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <action.icon size={32} className="text-brand-red mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                                    <p className="text-sm font-heading font-semibold text-brand-black dark:text-white">
                                        {action.name}
                                    </p>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Recent Orders & Top Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <h3 className="text-lg font-heading font-bold text-brand-black dark:text-white mb-4">
                            Recent Orders
                        </h3>
                        <div className="space-y-3">
                            {stats?.recentOrders.map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                >
                                    <div>
                                        <p className="font-heading font-semibold text-brand-black dark:text-white">
                                            #{order.id} - {order.customerName}
                                        </p>
                                        <p className="text-sm text-brand-black/70 dark:text-gray-300 font-body">
                                            {order.time}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-heading font-bold text-brand-red">
                                            RM {order.total.toFixed(2)}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Top Selling Items */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <h3 className="text-lg font-heading font-bold text-brand-black dark:text-white mb-4">
                            Top Selling Items
                        </h3>
                        <div className="space-y-3">
                            {stats?.topSellingItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-heading font-semibold text-brand-black dark:text-white">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-brand-black/70 dark:text-gray-300 font-body">
                                                {item.quantity} sold
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-heading font-bold text-brand-red">
                                        RM {item.revenue.toFixed(2)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
