import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, CheckIcon, AlertCircleIcon, SendIcon } from 'lucide-react';

interface NewsletterSignupProps {
    variant?: 'inline' | 'modal' | 'popup';
    size?: 'sm' | 'md' | 'lg';
    showPreferences?: boolean;
    onSuccess?: (email: string) => void;
    onError?: (error: string) => void;
}

interface NewsletterData {
    email: string;
    firstName?: string;
    lastName?: string;
    preferences: {
        promotions: boolean;
        newItems: boolean;
        events: boolean;
        general: boolean;
    };
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
    variant = 'inline',
    size = 'md',
    showPreferences = false,
    onSuccess,
    onError
}) => {
    const [formData, setFormData] = useState<NewsletterData>({
        email: '',
        firstName: '',
        lastName: '',
        preferences: {
            promotions: true,
            newItems: true,
            events: false,
            general: true
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('preferences.')) {
            const preferenceKey = name.split('.')[1] as keyof typeof formData.preferences;
            setFormData(prev => ({
                ...prev,
                preferences: {
                    ...prev.preferences,
                    [preferenceKey]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email) {
            setError('Email address is required');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate success/error
            const isSuccessResponse = Math.random() > 0.1; // 90% success rate

            if (isSuccessResponse) {
                setIsSuccess(true);
                onSuccess?.(formData.email);

                // Reset form after success
                setTimeout(() => {
                    setFormData({
                        email: '',
                        firstName: '',
                        lastName: '',
                        preferences: {
                            promotions: true,
                            newItems: true,
                            events: false,
                            general: true
                        }
                    });
                    setIsSuccess(false);
                }, 3000);
            } else {
                throw new Error('Failed to subscribe. Please try again.');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'text-sm px-4 py-2';
            case 'lg':
                return 'text-lg px-6 py-4';
            default:
                return 'text-base px-5 py-3';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'modal':
                return 'bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-brand-xl max-w-md mx-auto';
            case 'popup':
                return 'bg-gradient-to-r from-yellow-gold to-yellow-400 rounded-2xl p-6 shadow-brand-xl max-w-sm';
            default:
                return 'bg-white/10 backdrop-blur-sm rounded-2xl p-6';
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                className={`${getVariantClasses()} text-center`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <CheckIcon size={32} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-heading font-bold text-brand-black dark:text-white mb-2">
                    Successfully Subscribed!
                </h3>
                <p className="text-brand-black/70 dark:text-gray-300 font-body">
                    Thank you for subscribing to our newsletter. You'll receive updates soon!
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className={getVariantClasses()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-brand-black dark:text-white mb-2">
                    Stay Updated
                </h3>
                <p className="text-brand-black/70 dark:text-gray-300 font-body">
                    Get the latest news, promotions, and menu updates delivered to your inbox.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {showPreferences && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                placeholder="Your first name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                                placeholder="Your last name"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-2">
                        Email Address *
                    </label>
                    <div className="relative">
                        <MailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body bg-white dark:bg-gray-700 text-brand-black dark:text-white"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>

                {showPreferences && (
                    <div>
                        <label className="block text-sm font-heading font-semibold text-brand-black dark:text-white mb-3">
                            Email Preferences
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { key: 'promotions', label: 'Promotions & Offers' },
                                { key: 'newItems', label: 'New Menu Items' },
                                { key: 'events', label: 'Events & News' },
                                { key: 'general', label: 'General Updates' }
                            ].map((pref) => (
                                <label key={pref.key} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name={`preferences.${pref.key}`}
                                        checked={formData.preferences[pref.key as keyof typeof formData.preferences]}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-yellow-gold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-gold focus:ring-2"
                                    />
                                    <span className="text-sm font-body text-brand-black dark:text-white">
                                        {pref.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {error && (
                    <motion.div
                        className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AlertCircleIcon size={16} />
                        <span className="text-sm font-body">{error}</span>
                    </motion.div>
                )}

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
            w-full ${getSizeClasses()} 
            bg-brand-red hover:bg-red-700 disabled:bg-gray-400 
            text-white font-heading font-semibold 
            rounded-xl transition-all duration-300 
            disabled:cursor-not-allowed 
            flex items-center justify-center gap-2
            shadow-brand hover:shadow-brand-lg
          `}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Subscribing...
                        </>
                    ) : (
                        <>
                            <SendIcon size={20} />
                            Subscribe Now
                        </>
                    )}
                </motion.button>
            </form>

            <p className="text-xs text-brand-black/60 dark:text-gray-400 text-center mt-4 font-body">
                By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
            </p>
        </motion.div>
    );
};

export default NewsletterSignup;
