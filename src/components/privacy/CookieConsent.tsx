import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CookieIcon,
  XIcon,
  SettingsIcon,
  AlertTriangleIcon,
  ShieldIcon,
  EyeIcon,
} from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void;
  onReject: () => void;
  onCustomize: (preferences: CookiePreferences) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onReject,
  onCustomize,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    onAccept(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    onReject();
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const handleCustomize = () => {
    onCustomize(preferences);
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handlePreferenceChange = (
    key: keyof CookiePreferences,
    value: boolean
  ) => {
    if (key === 'necessary') return; // Cannot change necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Necessary Cookies',
      description:
        'Essential for the website to function properly. These cannot be disabled.',
      icon: ShieldIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      required: true,
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analytics Cookies',
      description:
        'Help us understand how visitors interact with our website by collecting anonymous information.',
      icon: EyeIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      required: false,
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Marketing Cookies',
      description:
        'Used to track visitors across websites to display relevant and engaging advertisements.',
      icon: AlertTriangleIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      required: false,
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Functional Cookies',
      description:
        'Enable enhanced functionality and personalization, such as remembering your preferences.',
      icon: SettingsIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      required: false,
    },
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsVisible(false)}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          {!showSettings ? (
            // Main consent screen
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center">
                  <CookieIcon size={24} className="text-brand-red" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                    Cookie Preferences
                  </h2>
                  <p className="text-brand-black/70 dark:text-gray-300 font-body">
                    We use cookies to enhance your experience
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-brand-black/80 dark:text-gray-300 font-body leading-relaxed mb-4">
                  At Ayam Gepuk Artisan, we respect your privacy and are
                  committed to protecting your personal data. We use cookies and
                  similar technologies to provide, protect, and improve our
                  services.
                </p>
                <p className="text-brand-black/80 dark:text-gray-300 font-body leading-relaxed">
                  By clicking "Accept All", you consent to our use of cookies.
                  You can also customize your preferences or learn more about
                  our privacy practices.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 shadow-brand hover:shadow-brand-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept All
                </motion.button>
                <motion.button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 bg-white dark:bg-gray-700 text-brand-black dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-xl font-heading font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Customize
                </motion.button>
                <motion.button
                  onClick={handleRejectAll}
                  className="flex-1 bg-gray-100 dark:bg-gray-600 text-brand-black dark:text-white px-6 py-3 rounded-xl font-heading font-semibold hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reject All
                </motion.button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-brand-black/60 dark:text-gray-400 font-body text-center">
                  By continuing to use our website, you agree to our{' '}
                  <a
                    href="/privacy-policy"
                    className="text-brand-red hover:underline"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="/terms-of-service"
                    className="text-brand-red hover:underline"
                  >
                    Terms of Service
                  </a>
                  .
                </p>
              </div>
            </div>
          ) : (
            // Settings screen
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                  Cookie Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {cookieTypes.map(type => (
                  <motion.div
                    key={type.key}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      preferences[type.key]
                        ? 'border-brand-red bg-brand-red/5'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${type.bgColor} flex-shrink-0`}
                      >
                        <type.icon size={20} className={type.color} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-semibold text-brand-black dark:text-white">
                            {type.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {type.required && (
                              <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-600 px-2 py-1 rounded-full">
                                Required
                              </span>
                            )}
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences[type.key]}
                                onChange={e =>
                                  handlePreferenceChange(
                                    type.key,
                                    e.target.checked
                                  )
                                }
                                disabled={type.required}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-red/20 dark:peer-focus:ring-brand-red/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-red"></div>
                            </label>
                          </div>
                        </div>
                        <p className="text-sm text-brand-black/70 dark:text-gray-300 font-body">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handleCustomize}
                  className="flex-1 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 shadow-brand hover:shadow-brand-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Preferences
                </motion.button>
                <motion.button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-white dark:bg-gray-700 text-brand-black dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-xl font-heading font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept All
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
