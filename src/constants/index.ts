// Business Information Constants
export const BUSINESS_INFO = {
  PHONE: '0182442017',
  EMAIL: 'info@ayamgepukartisan.com',
  WEBSITE: 'https://ayamgepukartisan.com',
  ADDRESS: 'Seremban 2, Malaysia',
  HOURS: {
    WEEKDAYS: '10:00 AM - 10:00 PM',
    WEEKENDS: '11:00 AM - 11:00 PM',
    HOLIDAYS: '11:00 AM - 10:00 PM',
  },
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/ayamgepukartisan',
    INSTAGRAM: 'https://instagram.com/ayamgepukartisan',
    WHATSAPP: 'https://wa.me/60182442017',
  },
} as const;

// SEO Constants
export const SEO_CONFIG = {
  TITLE: 'Ayam Gepuk Artisan - Authentic Indonesian Cuisine',
  DESCRIPTION:
    'Experience authentic Indonesian smashed fried chicken with traditional spices and sambal. Premium quality ingredients and traditional cooking methods.',
  KEYWORDS:
    'ayam gepuk, indonesian food, malaysia restaurant, authentic cuisine, fried chicken, sambal',
  OG_IMAGE: '/og-image.jpg',
  TWITTER_HANDLE: '@ayamgepukartisan',
} as const;

// Performance Constants
export const PERFORMANCE_CONFIG = {
  IMAGE_QUALITY: 80,
  LAZY_LOAD_THRESHOLD: 0.1,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
} as const;

// Animation Constants
export const ANIMATION_CONFIG = {
  PAGE_TRANSITION_DURATION: 0.5,
  HOVER_SCALE: 1.05,
  TAP_SCALE: 0.95,
  SPRING_CONFIG: {
    stiffness: 500,
    damping: 30,
  },
} as const;

// Mobile Breakpoints
export const BREAKPOINTS = {
  MOBILE: '320px',
  MOBILE_LARGE: '425px',
  TABLET: '768px',
  DESKTOP: '1024px',
  DESKTOP_LARGE: '1440px',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.ayamgepukartisan.com'
      : 'http://localhost:3001',
  MENU: '/api/menu',
  ORDERS: '/api/orders',
  AUTH: '/api/auth',
  LOCATIONS: '/api/locations',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    'Network connection error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  CART_ERROR: 'Unable to update cart. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ORDER_PLACED: 'Order placed successfully!',
  CART_UPDATED: 'Cart updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  REVIEW_SUBMITTED: 'Review submitted successfully!',
} as const;
