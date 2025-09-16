# Development Guide

## Performance Issues Fixed

This document outlines the performance issues that have been resolved and how to run the development server properly.

## Issues Resolved

### 1. React Router Future Flag Warnings
- ✅ Added `v7_startTransition` and `v7_relativeSplatPath` future flags to BrowserRouter
- ✅ This eliminates the React Router v7 compatibility warnings

### 2. Security Headers Configuration
- ✅ Fixed CSP and X-Frame-Options header configuration
- ✅ Headers are now properly set via HTTP headers in Vite config
- ✅ Meta tag fallbacks only used in development with proper warnings

### 3. Performance Monitoring Optimization
- ✅ Filtered out false positive "slow resource" warnings
- ✅ Excluded failed connections and development server polling from performance alerts
- ✅ Only actual slow resources are now reported

### 4. Development Server Connection Issues
- ✅ Configured Vite to use port 5175 consistently
- ✅ Added proper HMR (Hot Module Replacement) configuration
- ✅ Created development server management script

### 5. Admin Settings System Implementation
- ✅ Created comprehensive admin settings management interface
- ✅ Implemented site-wide configuration system
- ✅ Added development-only admin access button
- ✅ Integrated settings preview in frontend

## Running the Development Server

### Option 1: Using the enhanced script (Recommended)
```bash
npm run dev
```

### Option 2: Direct Vite command
```bash
npm run dev:direct
```

### Option 3: Using start command
```bash
npm start
```

## Server Configuration

The development server is configured to run on:
- **Port**: 5175
- **Host**: All interfaces (0.0.0.0)
- **HMR**: Enabled on port 5175
- **Security Headers**: Properly configured

## Troubleshooting

### If you see connection refused errors:
1. Make sure no other process is using port 5175
2. Try running `npm run dev:direct` for direct Vite execution
3. Check if your firewall is blocking the port

### If you see security header warnings:
- These are now properly configured via HTTP headers
- Meta tag warnings in development are expected and harmless

### If you see performance warnings:
- Failed connections are now filtered out
- Only actual slow resources will trigger warnings

## Production Deployment

For production, ensure your web server (nginx, Apache, etc.) is configured with the proper security headers:

```nginx
# Example nginx configuration
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' fonts.googleapis.com fonts.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: blob: fonts.gstatic.com; font-src 'self' data: fonts.gstatic.com; connect-src 'self' fonts.googleapis.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests" always;
```

## Admin Settings System

The admin settings system provides a comprehensive interface for managing site-wide configurations:

### Features
- General site settings (name, description, contact info)
- SEO management (meta tags, social media optimization)
- Theme customization (colors, fonts)
- Social media integration
- Menu configuration
- Development-only access (hidden in production)

### Access
In development mode, an "Admin" button appears in the top-left corner of the homepage for quick access to the admin dashboard.

### Architecture
- Context-based state management
- Responsive UI components
- Type-safe TypeScript implementation
- Route-based lazy loading

## Performance Monitoring

The application includes built-in performance monitoring that:
- Tracks Core Web Vitals (LCP, FID, CLS)
- Monitors resource loading times
- Filters out false positives from failed connections
- Provides detailed performance reports

Performance data is logged to the console in development and can be sent to analytics services in production.
