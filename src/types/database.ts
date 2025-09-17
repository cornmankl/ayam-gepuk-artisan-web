// Database Schema for Ayam Gepuk Artisan
// This file defines the TypeScript interfaces for our database structure

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'krispy' | 'klasik' | 'side' | 'drink';
  image: string;
  popular: boolean;
  available: boolean;
  ingredients?: string[];
  allergens?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  preparationTime?: number; // in minutes
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  updatedAt: Date;
}

export interface Promotion {
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
  applicableItems?: number[]; // Menu item IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Outlet {
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

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  preferences: {
    dietaryRestrictions: string[];
    favoriteItems: number[]; // Menu item IDs
    spiceLevel: 1 | 2 | 3 | 4 | 5;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  customerId: number;
  outletId: number;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'delivered'
    | 'cancelled';
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  paymentMethod: 'cash' | 'card' | 'online' | 'ewallet';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    instructions?: string;
  };
  specialInstructions?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  promotionId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
  customizations?: {
    spiceLevel?: 1 | 2 | 3 | 4 | 5;
    extraIngredients?: string[];
    removeIngredients?: string[];
  };
}

export interface LoyaltyTransaction {
  id: number;
  customerId: number;
  orderId?: number;
  type: 'earned' | 'redeemed' | 'expired' | 'bonus';
  points: number;
  description: string;
  expiresAt?: Date;
  createdAt: Date;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  preferences: {
    promotions: boolean;
    newItems: boolean;
    events: boolean;
    general: boolean;
  };
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: number; // Staff member ID
  reply?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'chef' | 'cashier' | 'delivery';
  outletId?: number;
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  id: number;
  date: Date;
  outletId?: number;
  metrics: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    newCustomers: number;
    returningCustomers: number;
    popularItems: { itemId: number; quantity: number }[];
    peakHours: { hour: number; orders: number }[];
    orderTypes: {
      dineIn: number;
      takeaway: number;
      delivery: number;
    };
    paymentMethods: {
      cash: number;
      card: number;
      online: number;
      ewallet: number;
    };
  };
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
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

export interface OrderFormData {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryInfo: {
    type: 'dine-in' | 'takeaway' | 'delivery';
    address?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      instructions?: string;
    };
  };
  items: {
    menuItemId: number;
    quantity: number;
    specialInstructions?: string;
  }[];
  paymentMethod: 'cash' | 'card' | 'online' | 'ewallet';
  specialInstructions?: string;
}
