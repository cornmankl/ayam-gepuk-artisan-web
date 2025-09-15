import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusIcon,
    EditIcon,
    TrashIcon,
    SearchIcon,
    FilterIcon,
    MapPinIcon,
    PhoneIcon,
    MailIcon,
    EyeIcon,
    EyeOffIcon,
    SaveIcon,
    XIcon,
    NavigationIcon,
    CarIcon,
    UtensilsIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Outlet {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    openingHours: {
        monday: { open: string; close: string; closed: boolean };
        tuesday: { open: string; close: string; closed: boolean };
        wednesday: { open: string; close: string; closed: boolean };
        thursday: { open: string; close: string; closed: boolean };
        friday: { open: string; close: string; closed: boolean };
        saturday: { open: string; close: string; closed: boolean };
        sunday: { open: string; close: string; closed: boolean };
    };
    services: ('dine-in' | 'takeaway' | 'delivery' | 'drive-thru')[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const OutletsManagement: React.FC = () => {
    const { hasPermission } = useAuth();
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    // const [isLoading, setIsLoading] = useState(true); // Removed unused state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedState, setSelectedState] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOutlet, setEditingOutlet] = useState<Outlet | null>(null);
    const [formData, setFormData] = useState<Partial<Outlet>>({});

    const states = [
        { id: 'all', name: 'All States' },
        { id: 'Kuala Lumpur', name: 'Kuala Lumpur' },
        { id: 'Selangor', name: 'Selangor' },
        { id: 'Negeri Sembilan', name: 'Negeri Sembilan' },
        { id: 'Johor', name: 'Johor' },
        { id: 'Penang', name: 'Penang' }
    ];

    const services = [
        { id: 'dine-in', name: 'Dine-in', icon: UtensilsIcon },
        { id: 'takeaway', name: 'Takeaway', icon: CarIcon },
        { id: 'delivery', name: 'Delivery', icon: NavigationIcon },
        { id: 'drive-thru', name: 'Drive-thru', icon: CarIcon }
    ];

    const days = [
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ];

    useEffect(() => {
        fetchOutlets();
    }, []);

    const fetchOutlets = async () => {
        // setIsLoading(true); // Removed unused state
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock data
            const mockOutlets: Outlet[] = [
                {
                    id: 1,
                    name: 'Ayam Gepuk Artisan - Seremban Main',
                    address: '123 Jalan Seremban',
                    city: 'Seremban',
                    state: 'Negeri Sembilan',
                    postalCode: '70000',
                    country: 'Malaysia',
                    phone: '+60-18-244-2017',
                    email: 'seremban@ayamgepukartisan.com',
                    coordinates: {
                        latitude: 2.7297,
                        longitude: 101.9381
                    },
                    openingHours: {
                        monday: { open: '10:00', close: '22:00', closed: false },
                        tuesday: { open: '10:00', close: '22:00', closed: false },
                        wednesday: { open: '10:00', close: '22:00', closed: false },
                        thursday: { open: '10:00', close: '22:00', closed: false },
                        friday: { open: '10:00', close: '22:00', closed: false },
                        saturday: { open: '10:00', close: '22:00', closed: false },
                        sunday: { open: '10:00', close: '22:00', closed: false }
                    },
                    services: ['dine-in', 'takeaway', 'delivery'],
                    isActive: true,
                    createdAt: new Date('2023-01-15'),
                    updatedAt: new Date('2023-10-20')
                },
                {
                    id: 2,
                    name: 'Ayam Gepuk Artisan - KL Branch',
                    address: '456 Jalan Ampang',
                    city: 'Kuala Lumpur',
                    state: 'Kuala Lumpur',
                    postalCode: '50450',
                    country: 'Malaysia',
                    phone: '+60-18-244-2018',
                    email: 'kl@ayamgepukartisan.com',
                    coordinates: {
                        latitude: 3.1390,
                        longitude: 101.6869
                    },
                    openingHours: {
                        monday: { open: '10:00', close: '22:00', closed: false },
                        tuesday: { open: '10:00', close: '22:00', closed: false },
                        wednesday: { open: '10:00', close: '22:00', closed: false },
                        thursday: { open: '10:00', close: '22:00', closed: false },
                        friday: { open: '10:00', close: '22:00', closed: false },
                        saturday: { open: '10:00', close: '22:00', closed: false },
                        sunday: { open: '10:00', close: '22:00', closed: false }
                    },
                    services: ['dine-in', 'takeaway', 'delivery', 'drive-thru'],
                    isActive: true,
                    createdAt: new Date('2023-06-01'),
                    updatedAt: new Date('2023-10-20')
                }
            ];

            setOutlets(mockOutlets);
        } catch (error) {
            console.error('Failed to fetch outlets:', error);
        } finally {
            // setIsLoading(false); // Removed unused state
        }
    };

    const filteredOutlets = outlets.filter(outlet => {
        const matchesSearch = outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            outlet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            outlet.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesState = selectedState === 'all' || outlet.state === selectedState;
        return matchesSearch && matchesState;
    });

    const handleAddOutlet = () => {
        setEditingOutlet(null);
        setFormData({
            name: '',
            address: '',
            city: '',
            state: 'Kuala Lumpur',
            postalCode: '',
            country: 'Malaysia',
            phone: '',
            email: '',
            coordinates: { latitude: 0, longitude: 0 },
            openingHours: {
                monday: { open: '10:00', close: '22:00', closed: false },
                tuesday: { open: '10:00', close: '22:00', closed: false },
                wednesday: { open: '10:00', close: '22:00', closed: false },
                thursday: { open: '10:00', close: '22:00', closed: false },
                friday: { open: '10:00', close: '22:00', closed: false },
                saturday: { open: '10:00', close: '22:00', closed: false },
                sunday: { open: '10:00', close: '22:00', closed: false }
            },
            services: ['dine-in', 'takeaway'],
            isActive: true
        });
        setIsModalOpen(true);
    };

    const handleEditOutlet = (outlet: Outlet) => {
        setEditingOutlet(outlet);
        setFormData(outlet);
        setIsModalOpen(true);
    };

    const handleDeleteOutlet = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this outlet?')) {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setOutlets(prev => prev.filter(outlet => outlet.id !== id));
            } catch (error) {
                console.error('Failed to delete outlet:', error);
            }
        }
    };

    const handleSaveOutlet = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (editingOutlet) {
                setOutlets(prev => prev.map(outlet =>
                    outlet.id === editingOutlet.id
                        ? { ...outlet, ...formData, updatedAt: new Date() }
                        : outlet
                ));
            } else {
                const newOutlet: Outlet = {
                    ...formData as Outlet,
                    id: Date.now(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                setOutlets(prev => [...prev, newOutlet]);
            }

            setIsModalOpen(false);
            setEditingOutlet(null);
            setFormData({});
        } catch (error) {
            console.error('Failed to save outlet:', error);
        }
    };

    const toggleActive = async (id: number) => {
        try {
            setOutlets(prev => prev.map(outlet =>
                outlet.id === id
                    ? { ...outlet, isActive: !outlet.isActive, updatedAt: new Date() }
                    : outlet
            ));
        } catch (error) {
            console.error('Failed to toggle outlet:', error);
        }
    };

    const handleServiceToggle = (serviceId: string) => {
        const currentServices = formData.services || [];
        const newServices = currentServices.includes(serviceId as any)
            ? currentServices.filter(s => s !== serviceId)
            : [...currentServices, serviceId as any];
        setFormData(prev => ({ ...prev, services: newServices }));
    };

    const handleOpeningHoursChange = (
        day: string,
        field: 'open' | 'close' | 'closed',
        value: any
    ) => {
        setFormData(prev => {
            // Ensure openingHours is always an object with all days
            const defaultDay = { open: '', close: '', closed: false };
            const prevOpeningHours = {
                monday: { ...defaultDay, ...(prev.openingHours?.monday || {}) },
                tuesday: { ...defaultDay, ...(prev.openingHours?.tuesday || {}) },
                wednesday: { ...defaultDay, ...(prev.openingHours?.wednesday || {}) },
                thursday: { ...defaultDay, ...(prev.openingHours?.thursday || {}) },
                friday: { ...defaultDay, ...(prev.openingHours?.friday || {}) },
                saturday: { ...defaultDay, ...(prev.openingHours?.saturday || {}) },
                sunday: { ...defaultDay, ...(prev.openingHours?.sunday || {}) },
                ...(prev.openingHours || {})
            };

            return {
                ...prev,
                openingHours: {
                    ...prevOpeningHours,
                    [day]: {
                        ...prevOpeningHours[day as keyof typeof prevOpeningHours],
                        [field]: value
                    }
                }
            };
        });
    };

    if (!hasPermission('outlets:manage')) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-heading font-bold text-brand-black dark:text-white mb-4">
                        Access Denied
                    </h1>
                    <p className="text-brand-black/70 dark:text-gray-300 font-body">
                        You don't have permission to manage outlets.
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
                            Outlets Management
                        </h1>
                        <p className="text-brand-black/70 dark:text-gray-300 font-body">
                            Manage your restaurant outlets and locations.
                        </p>
                    </div>
                    <motion.button
                        onClick={handleAddOutlet}
                        className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold flex items-center gap-2 shadow-brand hover:shadow-brand-lg transition-all duration-300 mt-4 md:mt-0"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PlusIcon size={20} />
                        Add New Outlet
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
                                placeholder="Search outlets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                            />
                        </div>
                        <div className="relative">
                            <FilterIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="pl-12 pr-8 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body appearance-none bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                            >
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Outlets Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    layout
                >
                    <AnimatePresence mode="wait">
                        {filteredOutlets.map((outlet, index) => (
                            <motion.div
                                key={outlet.id}
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
                                <div className="h-48 bg-gradient-to-br from-brand-red to-red-700 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <div className={`px-3 py-1 rounded-full text-xs font-heading font-semibold text-white ${outlet.isActive ? 'bg-green-500' : 'bg-red-500'
                                            }`}>
                                            {outlet.isActive ? 'Active' : 'Inactive'}
                                        </div>
                                        <button
                                            onClick={() => toggleActive(outlet.id)}
                                            className={`p-2 rounded-full transition-all duration-300 ${outlet.isActive
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-red-500 text-white hover:bg-red-600'
                                                }`}
                                        >
                                            {outlet.isActive ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-heading font-bold mb-1">
                                            {outlet.name}
                                        </h3>
                                        <p className="text-sm font-body opacity-90">
                                            {outlet.city}, {outlet.state}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-brand-black/70 dark:text-gray-300">
                                            <MapPinIcon size={16} className="text-brand-red" />
                                            <span className="font-body">{outlet.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-brand-black/70 dark:text-gray-300">
                                            <PhoneIcon size={16} className="text-brand-red" />
                                            <span className="font-body">{outlet.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-brand-black/70 dark:text-gray-300">
                                            <MailIcon size={16} className="text-brand-red" />
                                            <span className="font-body">{outlet.email}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                            Services Available:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {outlet.services.map((service) => {
                                                const serviceInfo = services.find(s => s.id === service);
                                                return (
                                                    <span
                                                        key={service}
                                                        className="px-2 py-1 bg-yellow-gold/20 text-brand-black text-xs font-heading font-medium rounded-full flex items-center gap-1"
                                                    >
                                                        {serviceInfo && <serviceInfo.icon size={12} />}
                                                        {serviceInfo?.name}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <motion.button
                                            onClick={() => handleEditOutlet(outlet)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-heading font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <EditIcon size={16} />
                                            Edit
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleDeleteOutlet(outlet.id)}
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
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                                        {editingOutlet ? 'Edit Outlet' : 'Add New Outlet'}
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300"
                                    >
                                        <XIcon size={24} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                                Outlet Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                placeholder="Enter outlet name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                                State *
                                            </label>
                                            <select
                                                value={formData.state || 'Kuala Lumpur'}
                                                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                            >
                                                {states.filter(state => state.id !== 'all').map(state => (
                                                    <option key={state.id} value={state.id}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                            placeholder="Enter full address"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.city || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                placeholder="Enter city"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                                Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.postalCode || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                placeholder="Enter postal code"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.country || 'Malaysia'}
                                                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                placeholder="Enter country"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div>
                                        <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-3">
                                            Available Services
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {services.map((service) => (
                                                <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.services?.includes(service.id as any) || false}
                                                        onChange={() => handleServiceToggle(service.id)}
                                                        className="w-4 h-4 text-yellow-gold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-gold focus:ring-2"
                                                    />
                                                    <service.icon size={16} className="text-brand-red" />
                                                    <span className="text-sm font-body text-brand-black dark:text-white">
                                                        {service.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Opening Hours */}
                                    <div>
                                        <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-3">
                                            Opening Hours
                                        </label>
                                        <div className="space-y-3">
                                            {days.map((day) => (
                                                <div key={day} className="flex items-center gap-4">
                                                    <div className="w-20">
                                                        <span className="text-sm font-heading font-semibold text-brand-black dark:text-white capitalize">
                                                            {day}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={!formData.openingHours?.[day as keyof typeof formData.openingHours]?.closed}
                                                            onChange={(e) => handleOpeningHoursChange(day, 'closed', !e.target.checked)}
                                                            className="w-4 h-4 text-yellow-gold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-gold focus:ring-2"
                                                        />
                                                        <span className="text-sm font-body text-brand-black dark:text-white">Open</span>
                                                    </div>
                                                    {!formData.openingHours?.[day as keyof typeof formData.openingHours]?.closed && (
                                                        <>
                                                            <input
                                                                type="time"
                                                                value={formData.openingHours?.[day as keyof typeof formData.openingHours]?.open || '10:00'}
                                                                onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                                                                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                            />
                                                            <span className="text-brand-black/70 dark:text-gray-300">to</span>
                                                            <input
                                                                type="time"
                                                                value={formData.openingHours?.[day as keyof typeof formData.openingHours]?.close || '22:00'}
                                                                onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                                                                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
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
                                        onClick={handleSaveOutlet}
                                        className="flex-1 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold flex items-center justify-center gap-2 shadow-brand hover:shadow-brand-lg transition-all duration-300"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <SaveIcon size={20} />
                                        {editingOutlet ? 'Update Outlet' : 'Add Outlet'}
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

export default OutletsManagement;