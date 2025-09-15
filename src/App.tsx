import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from './components/common/ErrorBoundary';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { AccessibilityProvider } from './components/accessibility/AccessibilityProvider';
import { securityManager } from './utils/security';

export function App() {
  // Add padding to body to account for fixed navbar
  useEffect(() => {
    document.body.style.paddingTop = '80px';

    // Initialize security measures
    securityManager.setSecurityHeaders();

    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <LoyaltyProvider>
              <CartProvider>
                <RouterProvider router={router} />
              </CartProvider>
            </LoyaltyProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}