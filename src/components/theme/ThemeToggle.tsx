import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  showLabel = false,
}) => {
  const { theme, setTheme, actualTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: MonitorIcon },
  ] as const;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-12 h-12 text-lg';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'floating':
        return 'bg-white dark:bg-gray-800 shadow-brand-lg hover:shadow-brand-xl text-gray-900 dark:text-white';
      case 'dropdown':
        return 'bg-white dark:bg-gray-800 shadow-brand text-gray-900 dark:text-white';
      default:
        return 'bg-white/20 hover:bg-white/30 text-white';
    }
  };

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <motion.button
          className={`
            ${getSizeClasses()} 
            ${getVariantClasses()} 
            rounded-xl flex items-center justify-center transition-all duration-300 group
          `}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <currentTheme.icon
              size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
            />
          </motion.div>
        </motion.button>

        <motion.div
          className={`
            absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-brand-lg 
            overflow-hidden z-50 min-w-[120px]
          `}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -10,
            scale: isOpen ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          {themes.map((themeOption, index) => (
            <motion.button
              key={themeOption.value}
              className={`
                w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 
                transition-colors duration-200 text-sm font-body
                ${theme === themeOption.value ? 'bg-yellow-gold/20 text-yellow-gold' : 'text-gray-900 dark:text-white'}
              `}
              onClick={() => {
                setTheme(themeOption.value);
                setIsOpen(false);
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ x: 5 }}
            >
              <themeOption.icon size={16} />
              {themeOption.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.button
          className={`
            ${getSizeClasses()} 
            ${getVariantClasses()} 
            rounded-full flex items-center justify-center transition-all duration-300 group
          `}
          onClick={() => setTheme(actualTheme === 'light' ? 'dark' : 'light')}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          <motion.div
            animate={{ rotate: actualTheme === 'light' ? 0 : 180 }}
            transition={{ duration: 0.5 }}
          >
            {actualTheme === 'light' ? (
              <MoonIcon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
            ) : (
              <SunIcon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
            )}
          </motion.div>
        </motion.button>
      </motion.div>
    );
  }

  // Default button variant
  return (
    <motion.button
      className={`
        ${getSizeClasses()} 
        ${getVariantClasses()} 
        rounded-xl flex items-center justify-center transition-all duration-300 group
        ${showLabel ? 'px-4 gap-2' : ''}
      `}
      onClick={() => setTheme(actualTheme === 'light' ? 'dark' : 'light')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: actualTheme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {actualTheme === 'light' ? (
          <MoonIcon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
        ) : (
          <SunIcon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
        )}
      </motion.div>
      {showLabel && (
        <span className="font-heading font-semibold text-sm">
          {actualTheme === 'light' ? 'Dark' : 'Light'}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
