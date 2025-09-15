## Qwen Added Memories
- The user is on Windows (win32) and is working in the directory F:\CORNMAN\AYAM-GEPUK-ARTISAN\AYAM-GEPUK-ARTISAN-WEB.
- This is a React-based website for "Ayam Gepuk Artisan", an Indonesian restaurant in Malaysia.
- The project uses Vite as the build tool with React, TypeScript, Tailwind CSS, and React Router.

## Project Overview
This is a React-based website for "Ayam Gepuk Artisan", an authentic Indonesian restaurant located in Seremban, Malaysia. The website serves as both an online menu and ordering platform, featuring pages for home, menu, promotions, about, contact, cart, and checkout.

## Technology Stack
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom theme configuration
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Security**: Content Security Policy (CSP) and other HTTP security headers
- **SEO**: Meta tags, Open Graph, Twitter Cards, and structured data (JSON-LD)

## Project Structure
```
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers
│   ├── pages/              # Page components
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point
│   ├── router.tsx          # Router configuration
│   └── index.css           # Global CSS
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── DEVELOPMENT.md          # Development guide
```

## Building and Running
### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Alternative commands
npm run dev:direct
npm start
```

The development server runs on port 5175 with Hot Module Replacement (HMR) enabled.

### Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run build:analyze
```

## Development Conventions
- **Component Structure**: Components are organized by feature/functionality
- **Styling**: Tailwind CSS with custom theme extensions
- **Routing**: Declarative routing with React Router DOM
- **State Management**: Context API for global state (cart, auth, theme, loyalty)
- **Security**: HTTP security headers via Vite configuration
- **Performance**: Animation transitions with Framer Motion
- **SEO**: Comprehensive meta tags and structured data

## Available Scripts
- `npm run dev`: Start development server
- `npm run dev:direct`: Start Vite directly
- `npm run build`: Build for production
- `npm run build:analyze`: Build with bundle analysis
- `npm run preview`: Preview production build
- `npm run lint`: Lint code with ESLint and auto-fix
- `npm run lint:check`: Check for linting errors
- `npm run type-check`: TypeScript type checking
- `npm run test`: Run tests with Vitest
- `npm run test:ui`: Run tests with UI
- `npm run clean`: Clean build artifacts
- `npm run serve`: Serve production build on port 3000
- `npm start`: Alias for dev

## Key Features
1. **Responsive Design**: Mobile-first approach with Tailwind CSS
2. **Multi-page Application**: Home, Menu, Promotions, About, Contact, Cart, Checkout
3. **Shopping Cart**: Context-based cart management
4. **Authentication**: Auth0 integration for user authentication
5. **Loyalty Program**: Context-based loyalty tracking
6. **Theme Support**: Light/dark mode with next-themes
7. **Accessibility**: Accessibility features and keyboard navigation
8. **Security**: Comprehensive security headers and CSP
9. **SEO Optimization**: Meta tags, structured data, and social media tags
10. **Performance Monitoring**: Core Web Vitals tracking

## Configuration Files
- `vite.config.ts`: Vite configuration with security headers
- `tailwind.config.js`: Tailwind CSS theme customization
- `tsconfig.json`: TypeScript configuration
- `postcss.config.js`: PostCSS configuration for Tailwind
- `.eslintrc.cjs`: ESLint configuration

## Development Guide
See `DEVELOPMENT.md` for detailed information on:
- Resolved performance issues
- Security header configuration
- Development server management
- Troubleshooting common issues
- Production deployment guidelines