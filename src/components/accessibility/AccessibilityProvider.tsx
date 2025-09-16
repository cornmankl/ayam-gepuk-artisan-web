import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  Volume2Icon,
  MouseIcon,
  KeyboardIcon,
  SettingsIcon,
  CheckIcon,
  XIcon,
} from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusVisible: boolean;
  colorBlind: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  lineHeight: 'normal' | 'relaxed' | 'loose';
  spacing: 'compact' | 'normal' | 'relaxed';
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  isAccessibilityMode: boolean;
  announceToScreenReader: (message: string) => void;
  setFocus: (elementId: string) => void;
  skipToContent: () => void;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReader: false,
  keyboardNavigation: false,
  focusVisible: true,
  colorBlind: 'none',
  fontSize: 'medium',
  lineHeight: 'normal',
  spacing: 'normal',
};

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider'
    );
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  });

  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;

    // High contrast
    root.classList.toggle('high-contrast', settings.highContrast);

    // Large text
    root.classList.toggle('large-text', settings.largeText);

    // Reduced motion
    root.classList.toggle('reduced-motion', settings.reducedMotion);

    // Color blind support
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (settings.colorBlind !== 'none') {
      root.classList.add(settings.colorBlind);
    }

    // Font size
    root.classList.remove(
      'font-small',
      'font-medium',
      'font-large',
      'font-extra-large'
    );
    root.classList.add(`font-${settings.fontSize}`);

    // Line height
    root.classList.remove('line-normal', 'line-relaxed', 'line-loose');
    root.classList.add(`line-${settings.lineHeight}`);

    // Spacing
    root.classList.remove(
      'spacing-compact',
      'spacing-normal',
      'spacing-relaxed'
    );
    root.classList.add(`spacing-${settings.spacing}`);

    // Focus visible
    root.classList.toggle('focus-visible', settings.focusVisible);

    // Screen reader mode
    root.classList.toggle('screen-reader', settings.screenReader);

    // Keyboard navigation
    root.classList.toggle('keyboard-navigation', settings.keyboardNavigation);

    // Check if any accessibility features are enabled
    const hasAccessibilityFeatures = Object.values(settings).some(
      value =>
        value === true ||
        (typeof value === 'string' &&
          value !== 'none' &&
          value !== 'medium' &&
          value !== 'normal')
    );
    setIsAccessibilityMode(hasAccessibilityFeatures);

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Detect screen reader
  useEffect(() => {
    const detectScreenReader = () => {
      const isScreenReader =
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        window.speechSynthesis !== undefined;

      if (isScreenReader && !settings.screenReader) {
        updateSettings({ screenReader: true });
      }
    };

    detectScreenReader();
  }, [settings.screenReader]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (settings.keyboardNavigation) {
        // Skip to content
        if (event.key === 'Tab' && event.ctrlKey) {
          event.preventDefault();
          skipToContent();
        }

        // Announce current focus
        if (event.key === 'Tab') {
          const focused = document.activeElement;
          if (focused && focused.getAttribute('aria-label')) {
            announceToScreenReader(focused.getAttribute('aria-label')!);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.keyboardNavigation]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const announceToScreenReader = (message: string) => {
    if (settings.screenReader) {
      setAnnouncements(prev => [...prev, message]);

      // Clear announcement after 3 seconds
      setTimeout(() => {
        setAnnouncements(prev => prev.slice(1));
      }, 3000);
    }
  };

  const setFocus = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const skipToContent = () => {
    const mainContent =
      document.querySelector('main') || document.querySelector('#main-content');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      announceToScreenReader('Skipped to main content');
    }
  };

  const contextValue: AccessibilityContextType = {
    settings,
    updateSettings,
    resetSettings,
    isAccessibilityMode,
    announceToScreenReader,
    setFocus,
    skipToContent,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      {/* Skip to content link */}
      {settings.keyboardNavigation && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-red text-white px-4 py-2 rounded-lg font-heading font-semibold z-50"
          onClick={e => {
            e.preventDefault();
            skipToContent();
          }}
        >
          Skip to main content
        </a>
      )}
    </AccessibilityContext.Provider>
  );
};

// Accessibility Settings Panel
export const AccessibilitySettingsPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings, isAccessibilityMode } =
    useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const settingGroups = [
    {
      title: 'Visual',
      icon: EyeIcon,
      settings: [
        {
          key: 'highContrast' as keyof AccessibilitySettings,
          label: 'High Contrast',
          description: 'Increase contrast for better visibility',
          type: 'toggle',
        },
        {
          key: 'largeText' as keyof AccessibilitySettings,
          label: 'Large Text',
          description: 'Increase text size for better readability',
          type: 'toggle',
        },
        {
          key: 'fontSize' as keyof AccessibilitySettings,
          label: 'Font Size',
          description: 'Adjust text size',
          type: 'select',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'extra-large', label: 'Extra Large' },
          ],
        },
        {
          key: 'colorBlind' as keyof AccessibilitySettings,
          label: 'Color Blind Support',
          description: 'Adjust colors for color vision deficiency',
          type: 'select',
          options: [
            { value: 'none', label: 'None' },
            { value: 'protanopia', label: 'Protanopia' },
            { value: 'deuteranopia', label: 'Deuteranopia' },
            { value: 'tritanopia', label: 'Tritanopia' },
          ],
        },
      ],
    },
    {
      title: 'Motion',
      icon: MouseIcon,
      settings: [
        {
          key: 'reducedMotion' as keyof AccessibilitySettings,
          label: 'Reduce Motion',
          description: 'Minimize animations and transitions',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Navigation',
      icon: KeyboardIcon,
      settings: [
        {
          key: 'keyboardNavigation' as keyof AccessibilitySettings,
          label: 'Keyboard Navigation',
          description: 'Enable keyboard-only navigation',
          type: 'toggle',
        },
        {
          key: 'focusVisible' as keyof AccessibilitySettings,
          label: 'Focus Indicators',
          description: 'Show focus indicators for keyboard navigation',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Reading',
      icon: Volume2Icon,
      settings: [
        {
          key: 'screenReader' as keyof AccessibilitySettings,
          label: 'Screen Reader',
          description: 'Optimize for screen readers',
          type: 'toggle',
        },
        {
          key: 'lineHeight' as keyof AccessibilitySettings,
          label: 'Line Height',
          description: 'Adjust line spacing for readability',
          type: 'select',
          options: [
            { value: 'normal', label: 'Normal' },
            { value: 'relaxed', label: 'Relaxed' },
            { value: 'loose', label: 'Loose' },
          ],
        },
        {
          key: 'spacing' as keyof AccessibilitySettings,
          label: 'Element Spacing',
          description: 'Adjust spacing between elements',
          type: 'select',
          options: [
            { value: 'compact', label: 'Compact' },
            { value: 'normal', label: 'Normal' },
            { value: 'relaxed', label: 'Relaxed' },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-brand-lg z-40 transition-all duration-300 ${
          isAccessibilityMode
            ? 'bg-brand-red text-white'
            : 'bg-white dark:bg-gray-800 text-brand-black dark:text-white border-2 border-brand-red'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Accessibility Settings"
      >
        <SettingsIcon size={24} />
      </motion.button>

      {/* Settings Panel */}
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
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center">
                    <SettingsIcon size={24} className="text-brand-red" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                      Accessibility Settings
                    </h2>
                    <p className="text-brand-black/70 dark:text-gray-300 font-body">
                      Customize your experience for better accessibility
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {settingGroups.map((group, groupIndex) => (
                  <motion.div
                    key={group.title}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <group.icon size={20} className="text-brand-red" />
                      <h3 className="text-lg font-heading font-semibold text-brand-black dark:text-white">
                        {group.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {group.settings.map(setting => (
                        <div key={setting.key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="font-body font-medium text-brand-black dark:text-white">
                              {setting.label}
                            </label>
                            {setting.type === 'toggle' && (
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={settings[setting.key] as boolean}
                                  onChange={e =>
                                    updateSettings({
                                      [setting.key]: e.target.checked,
                                    })
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-red/20 dark:peer-focus:ring-brand-red/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-red"></div>
                              </label>
                            )}
                            {setting.type === 'select' && (
                              <select
                                value={settings[setting.key] as string}
                                onChange={e =>
                                  updateSettings({
                                    [setting.key]: e.target.value,
                                  })
                                }
                                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-brand-black dark:text-white"
                              >
                                {setting.options?.map(option => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                          <p className="text-sm text-brand-black/60 dark:text-gray-400 font-body">
                            {setting.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={resetSettings}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-brand-black dark:text-white rounded-xl font-heading font-semibold hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300"
                >
                  Reset to Default
                </button>
                <div className="flex items-center gap-2 text-sm text-brand-black/60 dark:text-gray-400 font-body">
                  <CheckIcon size={16} />
                  Settings saved automatically
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityProvider;
