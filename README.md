# Ayam Gepuk Artisan - Authentic Indonesian Cuisine Website

A modern, responsive website for Ayam Gepuk Artisan restaurant featuring authentic Indonesian cuisine with premium ingredients and traditional cooking methods.

## 🍗 Features

- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Modern UI/UX** - Professional design with smooth animations
- **Interactive Menu** - Browse popular dishes and place orders
- **Location Finder** - Find nearest restaurant locations
- **AI Assistant** - Chat bot for customer support
- **Mobile Optimized** - Touch-friendly interface
- **Fast Performance** - Optimized loading and smooth transitions
- **Authentication System** - Role-based access control for admin features
- **Shopping Cart** - Add, remove, and update items in real-time
- **Loyalty Program** - Points system with tiered rewards
- **Theme Switching** - Light/dark mode support
- **Accessibility Features** - Screen reader support, keyboard navigation, high contrast mode
- **Admin Settings System** - Comprehensive site configuration management

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🎨 Design System

### Brand Colors
- **Yellow Gold**: #FFD700 (Primary)
- **Brand Red**: #E63946 (Secondary)
- **Brand Black**: #1C1C1C (Text)

### Typography
- **Headings**: Poppins, Plus Jakarta Sans
- **Body**: Inter, Roboto

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/cornmankl/ayam-gepuk-artisan-web.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build project
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 📁 Project Structure

```
src/
├── admin/                  # Admin system components
│   ├── components/         # Admin UI components
│   │   └── SettingsPanel.tsx # Site settings management interface
│   ├── contexts/           # Admin context providers
│   │   └── SettingsContext.tsx # Site settings context
│   ├── hooks/              # Admin custom hooks
│   ├── services/           # Admin services
│   ├── utils/              # Admin utility functions
│   ├── types/              # Admin type definitions
│   ├── AdminDashboard.tsx  # Main admin dashboard
│   └── adminRouter.tsx     # Admin routing configuration
├── components/              # Reusable components
│   ├── accessibility/      # Accessibility features and provider
│   ├── ai/                 # AI Assistant components
│   ├── common/             # Common components (Loading, Error)
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── logo/               # Logo and favicon components
│   ├── mobile/             # Mobile-specific components
│   ├── newsletter/         # Newsletter signup component
│   ├── ordering/           # Ordering components (OrderButton)
│   ├── privacy/            # Privacy components (CookieConsent)
│   ├── sections/           # Page sections (Hero, Features, Menu)
│   ├── seo/                # SEO components (SEOHead)
│   ├── social/             # Social media components
│   ├── theme/              # Theme components (ThemeToggle)
│   └── whatsapp/           # WhatsApp integration
├── constants/              # Application constants
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication and authorization
│   ├── CartContext.tsx     # Shopping cart management
│   ├── LoyaltyContext.tsx  # Loyalty program and rewards
│   └── ThemeContext.tsx    # Theme switching (light/dark mode)
├── data/                   # Static data (menu, locations, knowledge base)
├── pages/                  # Page components
│   ├── admin/              # Admin dashboard and management pages
│   │   ├── AdminDashboard.tsx       # Main admin dashboard
│   │   ├── AnalyticsDashboard.tsx   # Business analytics
│   │   ├── MenuManagement.tsx       # Menu item management
│   │   ├── OutletsManagement.tsx    # Restaurant outlets management
│   │   └── PromotionsManagement.tsx # Promotional offers management
│   ├── AboutPage.tsx       # About the restaurant
│   ├── CartPage.tsx        # Shopping cart
│   ├── CheckoutPage.tsx    # Order checkout
│   ├── ContactPage.tsx     # Contact information
│   ├── HomePage.tsx        # Homepage
│   ├── MenuPage.tsx        # Menu browsing
│   ├── PrivacyPolicy.tsx   # Privacy policy
│   └── PromotionsPage.tsx  # Current promotions
├── services/               # Service implementations
│   └── aiService.ts        # Multi-provider AI service
├── styles/                 # Global styles and design tokens
├── test/                   # Test components
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── App.tsx                 # Main application component
```

## 🎯 Key Components

- **HeroSection**: Main landing section with call-to-action
- **FeaturesSection**: Why choose us section
- **PopularMenuSection**: Featured menu items
- **LocationSection**: Restaurant locations with search
- **AIAssistant**: Customer support chat bot
- **OrderButton**: Floating order button
- **AccessibilityProvider**: Accessibility features and settings
- **ThemeToggle**: Light/dark mode switcher
- **CookieConsent**: GDPR/cookie consent banner
- **NewsletterSignup**: Email subscription form
- **WhatsAppIntegration**: WhatsApp chat integration
- **SettingsPanel**: Admin settings management interface

## 👤 Authentication & Authorization

The application includes a comprehensive authentication system with:
- Role-based access control (admin, manager, chef, cashier, delivery)
- Permission management system
- Session handling with token storage
- Protected admin routes and components

## 🛒 Shopping Cart System

- Add/remove items from cart
- Update item quantities
- Real-time total calculation
- Cart persistence across sessions

## 💳 Loyalty Program

- Points earning system based on order value
- Tiered membership levels (Bronze, Silver, Gold, Platinum)
- Reward redemption system
- Transaction history tracking
- Expiration date management

## 📊 Admin Dashboard

Admin users have access to comprehensive management tools:
- **Admin Dashboard**: Overview of key metrics (orders, revenue, customers)
- **Analytics Dashboard**: Detailed business analytics and insights
- **Menu Management**: Add, edit, and remove menu items
- **Outlets Management**: Manage restaurant locations and services
- **Promotions Management**: Create and manage promotional offers
- **Settings Management**: Configure site-wide settings including:
  - General site information (name, description, contact details)
  - SEO settings (meta tags, social media optimization)
  - Theme customization (colors, fonts)
  - Social media links
  - Business hours and special offers
- **User Management**: Manage admin users and permissions
- **Content Management**: Edit website content dynamically

## 🤖 AI Assistant

Powered by a multi-provider AI service supporting:
- OpenAI GPT models
- Anthropic Claude models
- Google Gemini models
- Knowledge base integration for instant responses
- Fallback mechanisms for reliability

## ⚙️ Admin Settings System

The admin settings system provides a comprehensive interface for managing site-wide configurations:

### General Settings
- Site name and description
- Contact information (email, phone, address)
- Business hours configuration
- Logo and favicon management

### SEO Management
- Meta title and description
- Open Graph image configuration
- Social media optimization tags

### Theme Customization
- Primary, secondary, and accent colors
- Font family selection
- Custom CSS variables

### Social Media Integration
- Facebook, Instagram, Twitter URLs
- WhatsApp contact number

### Menu Configuration
- Menu categories management
- Special offers and promotions

### Access Control
- Development-only admin access button (hidden in production)
- Future implementation: Authentication and role-based permissions

To access the admin system in development mode, look for the "Admin" button in the top-left corner of the homepage.

## 📞 Contact Information

- **Phone**: 0182442017
- **Email**: info@ayamgepukartisan.com
- **Location**: Seremban 2, Negeri Sembilan, Malaysia
- **Hours**: Mon-Fri 10AM-10PM, Sat-Sun 11AM-11PM

## 🌟 Features Highlights

- ✅ Mobile-first responsive design
- ✅ Smooth animations and transitions
- ✅ Interactive menu with ratings
- ✅ Location finder with search
- ✅ AI-powered customer support
- ✅ Fast loading and performance optimized
- ✅ SEO-friendly structure
- ✅ Accessibility compliant
- ✅ Role-based admin dashboard
- ✅ Loyalty rewards program
- ✅ Shopping cart functionality
- ✅ Theme switching (light/dark mode)
- ✅ Comprehensive admin settings system

## 📄 License

© 2024 Ayam Gepuk Artisan. All rights reserved.

---

**Made with ❤️ in Malaysia**