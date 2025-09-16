import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define types for our settings
export interface SiteSettings {
  // General settings
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  businessHours: string;
  
  // SEO settings
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  
  // Theme settings
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  
  // Social media
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  whatsappNumber: string;
  
  // Menu settings
  menuCategories: string[];
  specialOffers: string;
  
  // Analytics
  googleAnalyticsId: string;
  facebookPixelId: string;
}

export interface SettingsState {
  settings: SiteSettings;
  loading: boolean;
  error: string | null;
}

export type SettingsAction =
  | { type: 'LOAD_SETTINGS_START' }
  | { type: 'LOAD_SETTINGS_SUCCESS'; payload: SiteSettings }
  | { type: 'LOAD_SETTINGS_ERROR'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SiteSettings> };

// Initial state
const initialState: SettingsState = {
  settings: {
    siteName: 'Ayam Gepuk Artisan',
    siteDescription: 'Restoran Ayam Gepuk Authentic Indonesia di Malaysia',
    siteLogo: '/logo.png',
    favicon: '/favicon.ico',
    contactEmail: 'info@ayamgepukartisan.com',
    contactPhone: '+60123456789',
    address: '123, Jalan ABC, 70000 Seremban, Negeri Sembilan',
    businessHours: '10:00 AM - 10:00 PM',
    metaTitle: 'Ayam Gepuk Artisan - Restoran Authentic Indonesia',
    metaDescription: 'Nikmati hidangan ayam gepuk authentic Indonesia dengan sambal istimewa di restoran kami di Seremban, Malaysia.',
    ogImage: '/og-image.jpg',
    primaryColor: '#dc2626',
    secondaryColor: '#f8fafc',
    accentColor: '#f59e0b',
    fontFamily: 'Inter, sans-serif',
    facebookUrl: 'https://facebook.com/ayamgepukartisan',
    instagramUrl: 'https://instagram.com/ayamgepukartisan',
    twitterUrl: 'https://twitter.com/ayamgepukartisan',
    whatsappNumber: '+60123456789',
    menuCategories: ['Ayam Gepuk', 'Nasi Box', 'Minuman', 'Snack'],
    specialOffers: 'Diskaun 10% untuk tempahan lebih daripada RM50',
    googleAnalyticsId: '',
    facebookPixelId: '',
  },
  loading: false,
  error: null,
};

// Reducer
const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'LOAD_SETTINGS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOAD_SETTINGS_SUCCESS':
      return {
        ...state,
        loading: false,
        settings: { ...state.settings, ...action.payload },
      };
    case 'LOAD_SETTINGS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    default:
      return state;
  }
};

// Create context
interface SettingsContextType extends SettingsState {
  updateSettings: (settings: Partial<SiteSettings>) => void;
  loadSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider component
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // In a real app, this would fetch from an API
  const loadSettings = () => {
    dispatch({ type: 'LOAD_SETTINGS_START' });
    try {
      // Simulate API call
      setTimeout(() => {
        dispatch({ type: 'LOAD_SETTINGS_SUCCESS', payload: initialState.settings });
      }, 500);
    } catch (error) {
      dispatch({ type: 'LOAD_SETTINGS_ERROR', payload: 'Failed to load settings' });
    }
  };

  // In a real app, this would save to an API
  const updateSettings = (settings: Partial<SiteSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    
    // Simulate API call
    try {
      // In a real app, you would make an API call here
      console.log('Settings updated:', settings);
    } catch (error) {
      dispatch({ type: 'LOAD_SETTINGS_ERROR', payload: 'Failed to update settings' });
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ ...state, updateSettings, loadSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};