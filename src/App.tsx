import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Providers } from './Providers';
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
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
