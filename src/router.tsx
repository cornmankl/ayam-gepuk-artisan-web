import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import RouterErrorBoundary from './components/common/RouterErrorBoundary';
import { AdminRoute } from './components/admin/AdminRoute';

// Page transition wrapper component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

// Higher-order component for wrapping pages with transition and suspense
const withTransition = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <PageTransition>
      <Component />
    </PageTransition>
  </Suspense>
);

// Higher-order component for protected admin routes
const withAdminProtection = (Component: React.ComponentType) => (
  <AdminRoute>{withTransition(Component)}</AdminRoute>
);

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const PromotionsPage = lazy(() => import('./pages/PromotionsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const MobileTest = lazy(() => import('./components/mobile/MobileTest'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin components
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        index: true,
        element: withTransition(HomePage),
      },
      {
        path: 'menu',
        element: withTransition(MenuPage),
      },
      {
        path: 'promotions',
        element: withTransition(PromotionsPage),
      },
      {
        path: 'about',
        element: withTransition(AboutPage),
      },
      {
        path: 'contact',
        element: withTransition(ContactPage),
      },
      {
        path: 'cart',
        element: withTransition(CartPage),
      },
      {
        path: 'checkout',
        element: withTransition(CheckoutPage),
      },
      {
        path: 'privacy-policy',
        element: withTransition(PrivacyPolicy),
      },
      {
        path: 'mobile-test',
        element: withTransition(MobileTest),
      },
    ],
  },
  {
    path: '/admin',
    element: withAdminProtection(AdminDashboard),
    errorElement: <RouterErrorBoundary />,
  },
  {
    path: '*',
    element: withTransition(NotFoundPage),
  },
]);
