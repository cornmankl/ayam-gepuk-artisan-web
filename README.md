# Ayam Gepuk Artisan - Authentic Indonesian Cuisine Website

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-blue)

A modern, responsive website for Ayam Gepuk Artisan restaurant featuring authentic Indonesian cuisine with premium ingredients and traditional cooking methods.

## 📸 Screenshots

### Homepage
![Homepage Screenshot](docs/screenshots/homepage.png)

### Menu Page  
![Menu Screenshot](docs/screenshots/menu.png)

### Mobile Responsive
![Mobile Screenshot](docs/screenshots/mobile.png)

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
- **404 Error Handling** - Custom error pages with navigation
- **Admin Authentication** - Protected admin routes with rate limiting
- **Code Quality** - Prettier formatting and pre-commit hooks

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky
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

# Navigate to project
cd ayam-gepuk-artisan-web

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5175`

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:direct       # Start server on specific port

# Building
npm run build           # Build for production
npm run preview         # Preview production build
npm run build:analyze   # Analyze bundle size

# Code Quality
npm run lint           # Run ESLint with auto-fix
npm run lint:check     # Check linting without fix
npm run format         # Format code with Prettier
npm run format:check   # Check formatting

# Testing
npm run test          # Run unit tests
npm run test:ui       # Run tests with UI
npm run test:e2e      # Run E2E tests
npm run test:e2e-ui   # Run E2E tests with UI

# Type Checking
npm run type-check    # TypeScript type checking

# Utilities
npm run clean         # Clean build artifacts
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🧪 Testing

### Unit Tests
The project uses Vitest for unit testing with comprehensive test coverage for components:

```bash
npm run test                    # Run all tests
npm run test -- --watch        # Run tests in watch mode
npm run test:ui                 # Run with Vitest UI
```

### E2E Tests
End-to-end testing with Playwright:

```bash
npm run test:e2e               # Run E2E tests
npm run test:e2e-ui            # Run with Playwright UI
npx playwright install        # Install browser dependencies
```

### Test Coverage
- ✅ Button component unit tests
- ✅ Navigation flow E2E tests
- ✅ Cart functionality tests
- ✅ Mobile responsive tests
- ✅ 404 error handling tests

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

## 🔌 API Integration Examples

### Context API Usage

#### Cart Management
```typescript
import { useCart } from './context/CartContext';

function MyComponent() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  
  const handleAddItem = () => {
    addToCart({
      id: 'item-1',
      name: 'Ayam Gepuk Original',
      price: 25000,
      quantity: 1
    });
  };
  
  return (
    <div>
      <p>Cart items: {cart.length}</p>
      <button onClick={handleAddItem}>Add to Cart</button>
    </div>
  );
}
```

#### Theme Management
```typescript
import { useTheme } from './context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

#### Authentication
```typescript
import { useAuth } from './context/AuthContext';

function LoginButton() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return isAuthenticated ? (
    <button onClick={logout}>Logout {user?.name}</button>
  ) : (
    <button onClick={login}>Login</button>
  );
}
```

### Component Usage Examples

#### Reusable Button Component
```typescript
import { Button } from './components/common/Button';

function OrderForm() {
  return (
    <div>
      <Button variant="primary" size="lg" onClick={handleOrder}>
        Order Now
      </Button>
      <Button variant="outline" size="md" isLoading={loading}>
        Add to Cart
      </Button>
    </div>
  );
}
```

## 📁 Project Structure

```
src/
├── admin/                  # Admin system components
│   ├── components/         # Admin UI components
│   │   └── SettingsPanel.tsx # Site settings management interface
│   ├── contexts/           # Admin context providers
│   │   └── SettingsContext.tsx # Site settings context
│   ├── AdminDashboard.tsx  # Main admin dashboard
│   └── adminRouter.tsx     # Admin routing configuration
├── components/              # Reusable components
│   ├── accessibility/      # Accessibility features and provider
│   ├── admin/              # Admin route protection
│   ├── ai/                 # AI Assistant components
│   ├── common/             # Common components (Button, Loading, Error)
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
│   ├── AboutPage.tsx       # About the restaurant
│   ├── CartPage.tsx        # Shopping cart
│   ├── CheckoutPage.tsx    # Order checkout
│   ├── ContactPage.tsx     # Contact information
│   ├── HomePage.tsx        # Landing page
│   ├── MenuPage.tsx        # Food menu
│   ├── NotFoundPage.tsx    # 404 error page
│   ├── PrivacyPolicy.tsx   # Privacy policy
│   └── PromotionsPage.tsx  # Current promotions
├── services/               # External services
├── styles/                 # Global styles
├── test/                   # Test utilities
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── App.tsx                 # Main app component
├── Providers.tsx           # Context providers wrapper
├── index.tsx               # Application entry point
└── router.tsx              # Application routing
```

## 🔐 Security Features

- **Content Security Policy (CSP)** - Prevents XSS attacks
- **Admin Route Protection** - Authentication required for admin access
- **Rate Limiting** - Protection against brute force attacks
- **Audit Logging** - Authentication attempt logging
- **Session Management** - Secure session handling
- **Input Validation** - Form input sanitization

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliance** - Web accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - ARIA labels and descriptions
- **High Contrast Mode** - Improved visibility option
- **Focus Management** - Proper focus indicators
- **Alternative Text** - Images with descriptive alt text

## 🌟 Performance Optimizations

- **Code Splitting** - Lazy-loaded route components
- **Image Optimization** - Responsive images with proper formats
- **Bundle Analysis** - Tree shaking and dead code elimination
- **Caching Strategy** - Service worker for offline functionality
- **Core Web Vitals** - Optimized for Google's performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new components
- Update documentation for new features
- Follow the existing code style (Prettier + ESLint)
- Test across different devices and browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Ayam Gepuk Artisan**
- 📱 Phone: [0182442017](tel:0182442017)
- ✉️ Email: [info@ayamgepukartisan.com](mailto:info@ayamgepukartisan.com)
- 📍 Location: Seremban 2, Negeri Sembilan, Malaysia
- 🌐 Website: [ayamgepukartisan.com](https://ayamgepukartisan.com)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Vite for the blazing fast build tool
- All contributors and testers

---

*Made with ❤️ for authentic Indonesian cuisine lovers*
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